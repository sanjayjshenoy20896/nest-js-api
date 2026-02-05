import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Payload } from './types';

@Injectable()
export class AuthService {
    constructor(
       private userService: UsersService, 
       private jwtService: JwtService,
       private artistService:ArtistsService
    ){}
    
    // find user by email
    async findOne(loginDto:LoginDTO):Promise<{accessToken:string}>{
        let user = await this.userService.findOne(loginDto);
        const isMatch = await bcrypt.compare(loginDto.password,user?.password || "");
        if(isMatch){
            // const {password,...userWithoutPassword} = user;
            const payload:Payload = {email:user.email,userId:user.id};
            const artist = await this.artistService.findArtist(user.id);
            if(artist){
                payload.artistId = artist.id
            }
            return {
                accessToken:this.jwtService.sign(payload)
            }
        }else{
            throw new UnauthorizedException('Password does not match')
        }
    }
}
