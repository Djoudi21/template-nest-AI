import { IsNotEmpty } from 'class-validator';

export class QueryLlmDto {
  @IsNotEmpty()
  message: string;
}
