import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import type { Connection } from 'src/common/constants/connection';

@Controller({path:'songs',scope:Scope.REQUEST})
export class SongsController {
    constructor(
      private songsService:SongsService,
      @Inject('CONNECTION') 
      private connection:Connection,
    ){
      console.log(
      `THIS IS CONNECTION STRING ${this.connection.CONNECTION_STRING}`,
    );
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
    findOne(@Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ){
    return `fetch song on the based on id ${typeof id}`;
    }

    @Put(':id')
    update(@Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number){
        return 'update song'
    }

    @Delete(':id')
    delete(@Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number){
        return 'delete song'
    }
}
