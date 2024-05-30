import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { AuthGuard } from '../common/guards/at.guard';

@Controller('blog/save')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req): Promise<any> {
    return this.blogService.create(createBlogDto);
  }
}
