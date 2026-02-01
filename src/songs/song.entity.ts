import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlists/playlist.entity";
import { PrimaryGeneratedColumn,Column,Entity,ManyToMany,JoinTable, ManyToOne } from "typeorm";
@Entity('songs')
export class Song{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @Column('varchar', { array: true })
  // artists:String[];
  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true }) 
  @JoinTable({ name: "songs_artists" }) 
  artists: Artist[]

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;
  
  /** 
* Many songs can belong to the playlist for each unique user 
*/ 
@ManyToOne(() => Playlist, (playList) => playList.songs) 
playList:Playlist;
}