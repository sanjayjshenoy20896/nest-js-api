import { PrimaryGeneratedColumn,Column,Entity } from "typeorm";
@Entity('songs')
export class Song{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists:String[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;
}