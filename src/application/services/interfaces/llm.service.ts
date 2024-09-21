import { AIMessageChunk } from '@langchain/core/messages';

export interface ILlmService {
  runPrompt(prompt: string): Promise<AIMessageChunk>;
}
