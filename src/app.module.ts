import { Module } from '@nestjs/common';
import { AuthMudule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthMudule, BookmarkModule, UserModule],
  providers : [PrismaService]

})
export class AppModule {}
