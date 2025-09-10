import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [EventEmitterModule.forRoot(), UsersModule, PostsModule],
})
export class AppModule {}
