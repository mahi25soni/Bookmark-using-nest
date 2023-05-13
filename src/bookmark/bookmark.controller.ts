import { 
    Controller,
    Post,
    Get,
    Body, 
    Param,
    Delete,
    UseGuards, 
    Req,
    ParseIntPipe
 } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { ReturnResponse } from 'src/common/interfaces/response.interfaces';
import { JwtGuards } from 'src/auth/guards/auth.guards';
// import { Request } from '@nestjs/common';
import { Request } from 'express'
import { User } from 'src/auth/decorators/auth.decorators';


@UseGuards(JwtGuards)
@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService : BookmarkService) {}

    @Post("add") // User will add bookmarks to their system
    async add_faculty(@Body() data: BookmarkDto, @User("id") userId : number) : Promise<ReturnResponse>{
        return this.bookmarkService.add_bookmark(data, userId)
    }

    @Get("") // User will get every bookmark
    async get_all( @User("id") userId : number) {
        return this.bookmarkService.get_all(userId)
    }

    @Get(":id") // User will get, the bookmark he have chosen
        async get_one(@Param("id", ParseIntPipe) params : number,
        @User("id") userId : number) : Promise<ReturnResponse> {
        return this.bookmarkService.get_one(params, userId)

    }

    @Delete("delete") // Delete all of a particular user
    async delete_all(@User("id") userId : number): Promise<ReturnResponse> {
        return this.bookmarkService.delete_all(userId)
    }

    @Delete("delete/:id") 
    async delete_one(@Param("id", ParseIntPipe) params : number,
    @User("id") userId : number) : Promise<ReturnResponse> {
        return this.bookmarkService.delete_one(params, userId)

    }


}
