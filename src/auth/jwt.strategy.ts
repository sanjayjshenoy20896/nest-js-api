import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstants } from "./auth.constants";
import { Payload } from "./types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
           jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
           ignoreExpiration: false,
           secretOrKey:authConstants.secret
        });
    }

    async validate(payload:Payload){
        return {email:payload.email,userId:payload.userId,artistId:payload.artistId}
    }
}