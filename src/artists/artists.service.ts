import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist)
        private artistRepository:Repository<Artist>
    ){}

    // find artist
    async findArtist(userId:number):Promise<Artist>{
        let artist = await this.artistRepository.findOneBy({user:{id:userId}})
        if(!artist){
            throw new UnauthorizedException('Artist could not be found');
        }
        return artist;
    }
}
