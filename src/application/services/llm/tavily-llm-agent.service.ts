import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { ChatOpenAI } from '@langchain/openai';
import { MemorySaver } from '@langchain/langgraph';
import { HumanMessage } from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { Injectable } from '@nestjs/common';
import { ILlmAgentService } from '../interfaces/llm-agent.service';

@Injectable()
export class TavilyLlmAgentService implements ILlmAgentService {
  private agent: any;

  constructor() {
    // Define the tools for the agent to use
    const agentTools = [
      new TavilySearchResults({
        maxResults: 3,
        apiKey: process.env.TAVILY_API_KEY,
      }),
    ];
    const agentModel = new ChatOpenAI({ temperature: 0 });

    // Initialize memory to persist state between graph runs
    const agentCheckpointer = new MemorySaver();
    this.agent = createReactAgent({
      llm: agentModel,
      tools: agentTools,
      checkpointSaver: agentCheckpointer,
    });
  }

  // Method to interact with the agent
  public async runAgent(message: string): Promise<string> {
    const res = await this.agent.invoke(
      { messages: [new HumanMessage(message)] },
      { configurable: { thread_id: '42' } },
    );
    return res.messages[2].content;
  }
}
