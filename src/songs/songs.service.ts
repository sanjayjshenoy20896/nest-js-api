import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
    // local db
    private readonly songs:any[] = [];
    
    create(song:any){
        // save the songs in db
        this.songs.push(song);
        return this.songs;
    }
    findAll(){
        // fetch all the songs
        return this.songs;
    }
}
