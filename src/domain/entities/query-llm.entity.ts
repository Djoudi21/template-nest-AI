export class QueryLlmEntity {
  message: string;
  constructor(message?: string) {
    this.message = message;
  }

  setMessage(message: string): void {
    this.message = message;
  }
}
