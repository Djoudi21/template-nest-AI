import { Inject, Injectable } from '@nestjs/common';
import { QueryLlmDto } from '../../../application/dtos/query-llm.dto';
import { QueryLlmEntity } from '../../entities/query-llm.entity';
import { QueryLlmMapper } from '../../../application/mappers/llm/queryLlmMapper';
import { ILlmService } from '../../../application/services/interfaces/llm.service';
import { ILlmAgentService } from '../../../application/services/interfaces/llm-agent.service';

@Injectable()
export class QueryLlmUseCase {
  constructor(
    @Inject('LlmService') private readonly llmService: ILlmService,
    @Inject('LlmAgentService')
    private readonly llmAgentService: ILlmAgentService,
  ) {}

  async execute(dto: QueryLlmDto): Promise<QueryLlmEntity> {
    // Map the DTO to a domain entity
    const entity = QueryLlmMapper.toEntity(dto);
    const response = await this.llmAgentService.runAgent(entity.message);
    entity.setMessage(response);
    return QueryLlmMapper.toDto(entity);
  }
}
