import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
    @UseGuards(auth)
    @Get()
    async nothing() {
        return "aabrakadabra"
    }

}
