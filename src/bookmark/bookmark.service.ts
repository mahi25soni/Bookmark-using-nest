import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { ReturnResponse } from 'src/common/interfaces/response.interfaces';

@Injectable()
export class BookmarkService {
    constructor(private readonly prisma : PrismaService) {}

        async add_bookmark(data : BookmarkDto, id:number): Promise<ReturnResponse>{
            const new_bookmark = await this.prisma.bookmark.upsert({
                where : {
                    link : data.link
                },
                update : {
                    ...data
                },
                create : {
                    userId : id,
                    ...data
                }
            })
            return {
                data : new_bookmark,
                message : "New Faculty Added"
            }
        }
    
        async get_all(id : number): Promise<ReturnResponse> {
            const bookmarks = await this.prisma.bookmark.findMany({
                where : {
                    userId : id
                }
            })
            if(bookmarks.length === 0){
                throw new HttpException("Nothing uploaded yet", HttpStatus.NOT_FOUND)
            }
            return { 
                data : bookmarks,
                message : "There are your listed bookmarks for this user"
            }
        }
    
        async get_one(id : number,  userId : number): Promise<ReturnResponse> {
            const your_faculty = await this.prisma.bookmark.findFirst({
                where : {
                    userId : userId,
                    id : id
                }
            })
            if(!your_faculty){
                throw new HttpException("This faculty doesn't exist", HttpStatus.NOT_FOUND)
            }
            return { 
                data : your_faculty,
                message : "This is your faculty"
            }
        }
        async delete_all(id : number): Promise<ReturnResponse>{
            const all_faculties = await this.prisma.bookmark.deleteMany({
                where : {
                    userId : id
                }
            })
            if(all_faculties.count === 0){
                throw new HttpException("Nothing to be deleted", HttpStatus.NOT_FOUND)
            }
            
            return {
                data : all_faculties,
                message : "The list of faculties deleted"
            }
        }
    
        async delete_one(id : number, userId : number) : Promise<ReturnResponse> {
            const deleted_bookmarks = await this.prisma.bookmark.deleteMany({
                where : {
                    AND : [
                       { userId : userId},
                        {id : id}
                    ],
                },
            })
            if(!deleted_bookmarks){
                throw new HttpException("This faculty doesn't exist", HttpStatus.NOT_FOUND)
            }
            return {
                data : deleted_bookmarks,
                message : "This profile have been deleted"
            }
        }
    }

