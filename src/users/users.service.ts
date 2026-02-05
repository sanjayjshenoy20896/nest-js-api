import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/auth/dto/create-user.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';
import * as bcrypt from "bcryptjs"
import { UpdateResult } from 'typeorm/browser';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>
    ){}

    /**
 * 1. We have imported the User Entity imports: [TypeOrmModule.forFeature([User])], in 
the UsersModule now we can inject the UsersRepository inside the UsersService. 
2. We have created the salt number to encrypt the password 
3. We have encrypted the password and set it to userDTO password property 
4. You have to save the user by calling the save method from the repository 
5. You don't need to send the user password in the response. You have to delete the user 
password from the user object 
6. Finally we need to return the user in the response
 */
    // signup or register
    async createUser(userDto:CreateUserDTO):Promise<User>{
       const salt = await bcrypt.genSalt();
       userDto.password = await bcrypt.hash(userDto.password,salt);
       const user = await this.usersRepository.save(userDto);
       const { password, ...userWithoutPassword } = user;
       return userWithoutPassword as User;
    }

    async findOne(data: LoginDTO): Promise<User> {
        const user = await this.usersRepository.findOneBy({email:data.email});
        if(!user){
            throw new UnauthorizedException("Could not find the user")
        }
        return user;
    }
    async findById(userId:number):Promise<User>{
        const user = await this.usersRepository.findOneBy({id:userId});
        if(!user){
            throw new UnauthorizedException("Could not find the user")
        }
        return user;
    }

    async updateSecret(userId:number,secret:string): Promise<UpdateResult>{
        return this.usersRepository.update({id:userId},{twoFASecret:secret,enable2FA:true})        
    }
    async disable2FA(userId:number):Promise<UpdateResult>{
        return this.usersRepository.update({id:userId},{enable2FA:false});
    }
}

