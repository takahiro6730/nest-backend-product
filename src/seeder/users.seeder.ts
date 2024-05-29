import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../users/schemas/user.schema";
import { Seeder, DataFactory } from "nestjs-seeder";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersSeeder implements Seeder {
    constructor(@InjectModel(User.name) private readonly user: Model<User>) { }

    async seed(): Promise<any> {

        const saltOrRounds = 10;
        let testpwd = "Password1@"
        const hashedPassword = await bcrypt.hash(
            testpwd,
            saltOrRounds
        );

        // Generate 10 users.
        const users = [{
            "username": "seed_user",
            "first_name": "seed",
            "last_name": "user",
            "password": hashedPassword,
            "password_reset_code": "1",
            "email": "seed_user@test.com",
            "email_code": "eee"
        }]
        return this.user.insertMany(users);
    }

    async drop(): Promise<any> {
        // return true
        return this.user.deleteMany({});
    }
}