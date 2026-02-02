import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
       private userService: UsersService, 
       private jwtService: JwtService
    ){}
    
    // find user by email
    async findOne(loginDto:LoginDTO):Promise<{accessToken:string}>{
        let user = await this.userService.findOne(loginDto);
        const isMatch = await bcrypt.compare(loginDto.password,user?.password || "");
        if(isMatch){
            // const {password,...userWithoutPassword} = user;
            const payload = {email:user.email,sub:user.id};
            return {
                accessToken:this.jwtService.sign(payload)
            }
        }else{
            throw new UnauthorizedException('Password does not match')
        }
    }
}
