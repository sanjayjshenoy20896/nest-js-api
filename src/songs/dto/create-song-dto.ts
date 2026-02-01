import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

// songs module data transfer object for creating a song
/**
 * Four fields—title, artists, releasedDate, duration—are present. 
Class-validator enables the addition of decorator-based validations. The 
isDateString() function is employed to validate the date, while isMilitaryTime() 
is used for time validation in the HH:MM format. 
 */
export class CreateSongDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsNumber({},{each:true})
    // @IsString({each:true})
    readonly artists:number[];

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}