import { Body,Query, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import type { Connection } from 'src/common/constants/connection';
import { UpdateSongDto } from './dto/update-song-dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Song } from './song.entity';

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
    findAll(
      @Query('page', new DefaultValuePipe(1),ParseIntPipe) page:number =1,
      @Query('limit', new DefaultValuePipe(10),ParseIntPipe) limit:number =10,
    ):Promise<Pagination<Song>>{
        // try catch block added to demonstrate error handling
        try{
            // fake error message is simulated here to show error handling
            // throw  new  Error('Error in Db while fetching record');
            limit = limit > 100 ? 100 : limit;
            return this.songsService.paginate({
              page,
              limit,
            });
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
    return this.songsService.findOne(id)
    }

    @Put(':id')
    update(
      @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDto:UpdateSongDto):Promise<UpdateResult>
    {
        return this.songsService.update(id,updateSongDto);
    }

    @Delete(':id')
    delete(@Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number){
        this.songsService.remove(id);
        return 'delete song'
    }
}
