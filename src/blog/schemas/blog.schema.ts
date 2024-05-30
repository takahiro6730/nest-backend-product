import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author_id: number;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  preview: string;

  @Prop({ required: true })
  create_data: string;

  @Prop({ required: true })
  expire_data: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);