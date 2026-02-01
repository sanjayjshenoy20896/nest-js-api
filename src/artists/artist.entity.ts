import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { PrimaryGeneratedColumn,Column,Entity, OneToOne, JoinColumn, ManyToMany } from "typeorm";

@Entity('artists')
export class Artist{
    @PrimaryGeneratedColumn()
    id:number;   

    @OneToOne(()=> User)
    @JoinColumn()
    user: User;

    @ManyToMany(()=>Song, (song)=>song.artists)
    songs: Song[];
}