import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from "class-validator";

export class CreateBlogDto {
  @ApiProperty({ example: '{title: myblog, thumbnail: blog/customer, itemsData...}', description: 'blog content' })
  @IsNotEmpty()
  content: string;
  @ApiProperty({ example: '3', description: 'id of the auther' })
  author_id: number;
  @ApiProperty({ example: '30000', description: 'cost of the blog' })
  cost: number;
  @ApiProperty({ example: 'title: myblog, thumbnail: blog/customer, itemsData...}', description: 'blog preview' })
  preview: string;
  @ApiProperty({ example: '05/31/24', description: 'created date of the blog' })
  create_data: string;
  @ApiPropertyOptional({ example: '05/31/25', description: 'expire date of the blog' })
  expire_data: string;
}
