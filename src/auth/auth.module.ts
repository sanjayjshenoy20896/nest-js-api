import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
   imports:[UsersModule,JwtModule.register({secret:authConstants.secret,signOptions:{expiresIn:'1d'}}),PassportModule],
   controllers:[AuthController],
   providers:[AuthService,JwtStrategy],
   exports:[AuthService] 
})
export class AuthModule {}
