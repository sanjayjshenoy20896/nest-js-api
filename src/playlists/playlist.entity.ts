import { Song } from "src/songs/song.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('playlists')
export class Playlist{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    /** 
    * Each Playlist will have multiple songs 
    */ 
    @ManyToMany(()=>Song,(song)=>song.playList)
    songs:Song[]

}