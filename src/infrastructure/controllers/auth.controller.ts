import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUseCase } from '../../domain/use-cases/auth/register-use-case.service';
import { RegisterDto } from '../../application/dtos/register-dto';
import { LoginUseCase } from '../../domain/use-cases/auth/login.use-case';
import { LoginDto } from '../../application/dtos/login-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.registerUseCase.execute(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.loginUseCase.execute(loginDto);
  }
}
