import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import {
  AIMessageChunk,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages';
import { ILlmService } from '../interfaces/llm.service';

@Injectable()
export class LangChainService implements ILlmService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      model: process.env.OPENAI_API_MODEL,
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async runPrompt(prompt: string): Promise<AIMessageChunk> {
    try {
      const messages = [
        new SystemMessage('Translate the following from English into Italian'),
        new HumanMessage(prompt),
      ];
      return await this.model.invoke(messages);
    } catch (error) {
      console.error('Error running AI model:', error);
      throw new Error('AI model failed to run');
    }
  }
}
