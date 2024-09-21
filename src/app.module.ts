import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './infrastructure/providers/user.module';
import { UserController } from './infrastructure/controllers/user.controller';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { LlmController } from './infrastructure/controllers/llm.controller';
import { LlmModule } from './infrastructure/providers/llm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    LlmModule,
  ],
  controllers: [AppController, UserController, AuthController, LlmController],
  providers: [AppService],
})
export class AppModule {}
