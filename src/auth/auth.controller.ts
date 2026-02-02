import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ){}

    // route to register and signup
    @Post('signup')
    signup(@Body() createUserDto:CreateUserDTO):Promise<User>{
        return this.userService.createUser(createUserDto);
    }

    @Post('login')
    login(@Body() loginDTO:LoginDTO){
       return this.authService.findOne(loginDTO)
    }
}
