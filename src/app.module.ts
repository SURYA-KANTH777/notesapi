import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGO_URI || ''),
    AuthModule,
    UsersModule,
    NotesModule,
  ],
})
export class AppModule {}