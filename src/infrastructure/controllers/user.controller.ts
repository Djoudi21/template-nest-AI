import { Controller, Get, Param } from '@nestjs/common';
import { GetCurrentUserDto } from '../../application/dtos/get-current-user-dto';
import { GetCurrentUserUseCase } from '../../domain/use-cases/user/get-current-user-use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase, // Inject this use case
  ) {}
  @Get(':id')
  async getCurrentUser(@Param() params: any) {
    const getCurrentUserDto = new GetCurrentUserDto();
    getCurrentUserDto.id = params.id; // Assign the ID from the route param
    return await this.getCurrentUserUseCase.execute(getCurrentUserDto);
  }
}
