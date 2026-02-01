import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { UpdateResult } from 'typeorm/browser';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
    // local db
    // private readonly songs:any[] = [];
    constructor(
        @InjectRepository(Song)
        private songRepository:Repository<Song>
    ){
        
    }

    async paginate(options:IPaginationOptions):Promise<Pagination<Song>>{
        return paginate<Song>(this.songRepository,options);
    }
    
    create(songDTO:CreateSongDTO):Promise<Song>{
        // save the songs in db
        // this.songs.push(song);
        // return this.songs;
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.releasedDate = songDTO.releasedDate;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        return this.songRepository.save(song);  
    }
    findAll():Promise<Song[]>{
        // fetch all the songs
        return this.songRepository.find();
    }

    findOne(id:number):Promise<Song | null> {
        return this.songRepository.findOneBy({id});
    }

    async remove(id:number):Promise<void>{
        await this.songRepository.delete(id);
    }

    update(id:number, recordToUpdate:UpdateSongDto):Promise<UpdateResult>{
        return this.songRepository.update(id,recordToUpdate)
    }
}
