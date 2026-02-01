import { Artist } from "src/artists/artist.entity";
import { PrimaryGeneratedColumn,Column,Entity,ManyToMany,JoinTable } from "typeorm";
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
}