import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FAType, Payload } from './types';
import * as speakeasy from 'speakeasy'; 
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class AuthService {
    constructor(
       private userService: UsersService, 
       private jwtService: JwtService,
       private artistService:ArtistsService
    ){}
    
    // find user by email
    async findOne(loginDto:LoginDTO):Promise<{accessToken:string} | { validate2FA: string; message: string }>{
        let user = await this.userService.findOne(loginDto);
        const isMatch = await bcrypt.compare(loginDto.password,user?.password || "");
        if(isMatch){
            // const {password,...userWithoutPassword} = user;
            const payload:Payload = {email:user.email,userId:user.id};
            const artist = await this.artistService.findArtist(user.id);
            if(artist){
                payload.artistId = artist.id
            }
            if(user.enable2FA && user.twoFASecret){
                return {
                    validate2FA:'http://localhost:3000/auth/validate-2fa',
                    message:"Please sends the one time password/token from your Google Authenticator App"
                }
            }
            return {
                accessToken:this.jwtService.sign(payload)
            }
        }else{
            throw new UnauthorizedException('Password does not match')
        }
    }

    // enable 2FA
    async enable2FA(userId:number):Promise<Enable2FAType>{
        const user = await this.userService.findById(userId);
        if(user.enable2FA){
            return {secret:user.twoFASecret}
        }
        const secret = speakeasy.generateSecret();
        user.twoFASecret = secret.base32;
        await this.userService.updateSecret(userId, user.twoFASecret);
        return {secret:user.twoFASecret};
    }
    async disable2fa(userId:number):Promise<UpdateResult>{
        return await this.userService.disable2FA(userId);
    }
    async validate2FAToken(userId:number,token:string):Promise<{verified:boolean}>{
        try{
            // find user on basis of Id
            const user = await this.userService.findById(userId);

            // verify the secret;
            const verified = speakeasy.totp.verify({
                secret:user.twoFASecret,
                token:token,
                encoding:"base32"
            })
            if(verified){
                return {verified:true}
            }else{
                return {verified:false}
            }
        }catch(err){
            throw new UnauthorizedException('Error verifying token'); 
        }
        
    }

    async validateUserByApiKey(apiKey:string):Promise<User>{
        return this.userService.findUserByApiKey(apiKey);
    }
}
