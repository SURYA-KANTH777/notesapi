import { Module } from '@nestjs/common'; // ✅ You need this!
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Optional, but usually included

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [UsersService],
  controllers: [UsersController], // Include this if you have it
  exports: [UsersService],
})
export class UsersModule {}
