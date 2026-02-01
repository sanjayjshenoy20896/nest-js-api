import { Playlist } from "src/playlists/playlist.entity";
import { PrimaryGeneratedColumn,Column,Entity, OneToMany } from "typeorm";

@Entity('users')
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string; 

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(()=>Playlist,(playlist)=>playlist.user)
  playList:Playlist[];
}
