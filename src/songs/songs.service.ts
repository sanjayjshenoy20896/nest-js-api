import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
    // local db
    private readonly songs:string[] = [];
    
    create(song:string){
        // save the songs in db
        this.songs.push(song);
        return this.songs;
    }
    findAll(){
        // fetch all the songs
        return this.songs;
    }
}
