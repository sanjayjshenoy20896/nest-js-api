import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
    constructor(private songsService:SongsService){

    }
    @Post()
    createSong(){
       return this.songsService.create('Animals by Martin Garrix')
    }

    @Get()
    findAll(){
        return this.songsService.findAll()
    }

    @Get(':id')
    findOne(){
        return "find one song"
    }

    @Put(':id')
    update(){
        return 'update song'
    }

    @Delete(':id')
    delete(){
        return 'delete song'
    }
}
