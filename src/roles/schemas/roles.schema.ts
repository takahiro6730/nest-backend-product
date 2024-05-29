import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type RolesDocument = HydratedDocument<Roles>;

@Schema({ timestamps: true })
export class Roles {
  @Prop({ type: String })
  role_name: string;
  @Prop({ type: String })
  description: string;
  @Prop({ type: String })
  status: string;
  @Prop({ type: Boolean })
  is_admin: { type: Boolean, default: false }
  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);