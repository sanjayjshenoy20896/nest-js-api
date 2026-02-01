import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from "src/artists/artist.entity";
import { Song } from "src/songs/song.entity";
import { Playlist } from "./playlist.entity";
import { PlaylistsService } from "./playlist.service";
import { PlaylistsController } from "./playlist.controlller";
import { User } from "src/users/user.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Song,Artist,Playlist,User]),
    ],
    controllers:[PlaylistsController],
    providers:[PlaylistsService]
})

export class PlaylistModule {}