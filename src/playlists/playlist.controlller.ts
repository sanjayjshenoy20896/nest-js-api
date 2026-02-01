import { Body, Controller, Post } from "@nestjs/common";
import { PlaylistsService } from "./playlist.service";
import { CreatePlayListDto } from "./dto/create-playlist.dto";
import { Playlist } from "./playlist.entity";

@Controller('playlists')
export class PlaylistsController {
    constructor(
        private playlistsService:PlaylistsService
    ){}

    @Post()
    createPlaylist(
        @Body() createPlatListDto:CreatePlayListDto
    ):Promise<Playlist> {
        return this.playlistsService.create(createPlatListDto);
    }
}