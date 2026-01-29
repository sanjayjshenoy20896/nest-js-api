import { Controller, Delete, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
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
        try{
            // fake error message is simulated here to show error handling
            // throw  new  Error('Error in Db while fetching record'); 
            return this.songsService.findAll()
        }catch(err){
            throw new HttpException(err.message,HttpStatus.INTERNAL_SERVER_ERROR,{cause:err})
        }
       
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
