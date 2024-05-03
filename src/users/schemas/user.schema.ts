import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  username: string;
  @Prop({ type: String })
  first_name: string;
  @Prop({ type: String })
  last_name: string;
  @Prop({ type: String })
  activation_code: string;
  @Prop({ type: String })
  email: string;
  @Prop({ type: String })
  email_code: string;
  @Prop({ type: String })
  password: string;
  @Prop({ type: String })
  password_reset_code
  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
  @Prop({ default: false })
  isEmailVerify: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);