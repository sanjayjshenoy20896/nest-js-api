import { IsOptional, IsString,IsArray,IsDateString,IsMilitaryTime } from "class-validator";


// songs module data transfer object for updating  a song
/**
 * Four fields—title, artists, releasedDate, duration—are present. 
Class-validator enables the addition of decorator-based validations. The 
isDateString() function is employed to validate the date, while isMilitaryTime() 
is used for time validation in the HH:MM format. 
 */
export class UpdateSongDto {
    
    @IsString()
    @IsOptional()
    readonly title:string;

    @IsOptional()
    @IsArray()
    @IsString({each:true})
    readonly artists:string[];

    @IsDateString() 
    @IsOptional() 
    readonly releasedDate: Date; 
 
    @IsMilitaryTime() 
    @IsOptional() 
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}