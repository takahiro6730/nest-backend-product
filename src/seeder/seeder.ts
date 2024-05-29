import { ConfigModule } from '@nestjs/config';
import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserSchema } from "../users/schemas/user.schema";
import { UsersSeeder } from "./users.seeder";

seeder({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
            isGlobal: true
        }),
        MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema },]),
    ],
}).run([UsersSeeder]);