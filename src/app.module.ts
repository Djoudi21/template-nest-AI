import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './infrastructure/providers/user.module';
import { UserController } from './infrastructure/controllers/user.controller';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { LlmController } from './infrastructure/controllers/llm.controller';
import { LlmModule } from './infrastructure/providers/llm.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/providers/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    LlmModule,
    AuthModule,
  ],
  controllers: [UserController, AuthController, LlmController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
