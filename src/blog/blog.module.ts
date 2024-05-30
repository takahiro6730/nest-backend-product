import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    AuthModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}