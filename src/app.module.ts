import { Module } from '@nestjs/common';
import { AuthMudule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthMudule, BookmarkModule, UserModule],

})
export class AppModule {}
