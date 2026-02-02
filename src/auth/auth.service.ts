import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from "bcryptjs"
@Injectable()
export class AuthService {
    constructor(
       private userService: UsersService 
    ){}
    
    // find user by email
    async findOne(loginDto:LoginDTO):Promise<User>{
        let user = await this.userService.findOne(loginDto);
        const isMatch = await bcrypt.compare(loginDto.password,user?.password || "");
        if(isMatch){
            const {password,...userWithoutPassword} = user;
            return userWithoutPassword as User;
        }else{
            throw new UnauthorizedException('Password does not match')
        }
    }
}
