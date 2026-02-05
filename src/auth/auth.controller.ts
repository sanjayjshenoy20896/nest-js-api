import { Body, Controller, Post, Request, UseGuards,Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';
import { UpdateResult } from 'typeorm/browser';
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { AuthGuard } from '@nestjs/passport';

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

    @Post('enable2FA')
    @UseGuards(JwtAuthGuard)
    enable2FA(@Request() req):Promise<Enable2FAType>{
        return this.authService.enable2FA(req.user.userId);
    }

    @Get('disable2FA')
    @UseGuards(JwtAuthGuard)
    disable2FA(@Request() req):Promise<UpdateResult>{
        return this.authService.disable2fa(req.user.userId);
    }
    @Post('validate2FAToken')
    @UseGuards(JwtAuthGuard)
    async validate2FA(@Request() req,@Body() validateTokenDTO:ValidateTokenDTO):Promise<{verified:boolean}>{
        return this.authService.validate2FAToken(req.user.userId,validateTokenDTO.token);
    }
    
    @Get('profile')
    @UseGuards(AuthGuard('bearer'))
    profile(@Request() req){
        delete req.user.password; 
            return { 
            msg: 'authenticated with api key', 
            user: req.user, 
        }; 
    }



}
