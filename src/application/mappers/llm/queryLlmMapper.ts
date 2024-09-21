import { QueryLlmDto } from '../../dtos/query-llm.dto';
import { QueryLlmEntity } from '../../../domain/entities/query-llm.entity';

export class QueryLlmMapper {
  static toEntity(dto: QueryLlmDto): QueryLlmEntity {
    const entity = new QueryLlmEntity();
    entity.message = dto.message;
    return entity;
  }

  static toDto(entity: QueryLlmEntity) {
    return {
      message: entity.message,
      setMessage: entity.setMessage,
    };
  }
}
