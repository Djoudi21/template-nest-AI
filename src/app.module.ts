import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './infrastructure/providers/user.module';
import { UserController } from './infrastructure/controllers/user.controller';
import { AuthController } from './infrastructure/controllers/auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})
export class AppModule {}
