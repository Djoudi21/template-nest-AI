import { Module } from '@nestjs/common';
import { QueryLlmUseCase } from '../../domain/use-cases/llm/query-llm-use-case.service';
import { LangChainService } from '../../application/services/llm/langchain.service';
import { TavilyLlmAgentService } from '../../application/services/llm/tavily-llm-agent.service';

@Module({
  imports: [],
  providers: [
    QueryLlmUseCase,
    {
      provide: 'LlmService',
      useClass: LangChainService,
    },
    {
      provide: 'LlmAgentService',
      useClass: TavilyLlmAgentService,
    },
  ],
  exports: [QueryLlmUseCase],
})
export class LlmModule {}
