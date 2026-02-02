import { Exclude } from "class-transformer";
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

  @Column({unique:true})
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(()=>Playlist,(playlist)=>playlist.user)
  playList:Playlist[];
}
