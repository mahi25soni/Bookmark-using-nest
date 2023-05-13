import {
    IsNotEmpty,
    IsNumber,
    IsString
} from 'class-validator'
export class BookmarkDto {
    @IsNotEmpty()
    @IsString()
    bookmark_name : string;

    @IsNotEmpty()
    @IsString()
    link : string;

    @IsNotEmpty()
    @IsString()
    desc : string;
}