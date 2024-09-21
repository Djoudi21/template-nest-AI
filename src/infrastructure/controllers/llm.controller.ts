import { Body, Controller, Post } from '@nestjs/common';
import { QueryLlmDto } from '../../application/dtos/query-llm.dto';
import { QueryLlmUseCase } from '../../domain/use-cases/llm/query-llm-use-case.service';

@Controller('llm')
export class LlmController {
  constructor(private readonly queryLlmUseCase: QueryLlmUseCase) {}

  @Post('query')
  async query(@Body() dto: QueryLlmDto) {
    return await this.queryLlmUseCase.execute(dto);
  }
}
