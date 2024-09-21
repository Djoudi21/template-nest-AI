export interface ILlmAgentService {
  runAgent(message: string): Promise<string>;
}
