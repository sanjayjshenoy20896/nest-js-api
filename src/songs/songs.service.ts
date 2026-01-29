import { Inject, Injectable } from '@nestjs/common';
// import { Connection, connection } from 'src/common/constants/connection';

@Injectable()
export class SongsService {
    // constructor(
    //     @Inject('CONNECTION') connection:Connection
    // ){
    //              console.log("connection string", connection.CONNECTION_STRING); 

    // }
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
