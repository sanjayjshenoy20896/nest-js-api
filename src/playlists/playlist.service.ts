import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "src/artists/artist.entity";
import { Song } from "src/songs/song.entity";
import { Repository } from "typeorm";
import { Playlist } from "./playlist.entity";
import { CreatePlayListDto } from "./dto/create-playlist.dto";
import { User } from "src/users/user.entity";



@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Song)
        private songRepository:Repository<Song>,

        @InjectRepository(Artist)
        private artistRepository:Repository<Artist>,

        @InjectRepository(Playlist)
        private playlistRepository:Repository<Playlist>,

        @InjectRepository(User)
        private userRepository:Repository<User>,
    ){}

    async create(createPlayListDto:CreatePlayListDto):Promise<Playlist>{
        const playlist = new Playlist();
        playlist.name = createPlayListDto.name;
        // songs will be array of ids
        const songs  = await this.songRepository.findByIds(createPlayListDto.songs);
        playlist.songs = songs;
        
        const user = await this.userRepository.findOneBy({id:createPlayListDto.user});
        if (!user) {
            throw new Error('User not found');
        }
        playlist.user = user;
        return this.playlistRepository.save(playlist);
    }
}