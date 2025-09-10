import { Controller, Get, Post as PostMethod, Put, Delete, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import * as postsInterface from './posts.interface'; // <-- direkt interface'den import

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): postsInterface.Post[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): postsInterface.Post | undefined {
    return this.postsService.findOne(Number(id));
  }

  @PostMethod()
  create(@Body() post: Omit<postsInterface.Post, 'id'>): postsInterface.Post {
    return this.postsService.create(post);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<postsInterface.Post, 'id'>>,
  ): postsInterface.Post {
    return this.postsService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(Number(id));
  }
}
