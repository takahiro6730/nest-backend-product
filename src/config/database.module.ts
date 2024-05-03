import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        try {
          let url = 'mongodb://localhost:27017/procorse'
         console.log('===========',url)
          return {
            uri: 'mongodb://localhost:27017/procorse'
          };
        } catch (error) {
          console.log(error)
          // Handle connection error here
          console.error('Mongoose connection error:', error);
          throw new Error('Mongoose connection error');
        }
      },
    }),
  ],
})
export class DatabaseModule {}
