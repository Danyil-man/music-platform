import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    TrackModule,
    FileModule,
    MongooseModule.forRoot(
      'mongodb+srv://demyanyuk76:1234@music-platform.01yg6ky.mongodb.net/tracks?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
