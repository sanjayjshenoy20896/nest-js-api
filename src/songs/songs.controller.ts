import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
    constructor(private songsService:SongsService){

    }
    
    // use the CreateSongDTO to validate the incoming request body
    @Post()
    createSong(@Body() createSongDTO:CreateSongDTO){
       const results = this.songsService.create(createSongDTO);
       return results;
    }

    @Get()
    findAll(){
        // try catch block added to demonstrate error handling
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
