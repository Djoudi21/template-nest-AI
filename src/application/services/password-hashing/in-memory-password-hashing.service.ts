import { IPasswordHashingService } from '../interfaces/password-hashing.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryPasswordHashingService implements IPasswordHashingService {
  private hashStore: Map<string, string> = new Map();

  async hash(password: string): Promise<string> {
    // Simulated in-memory hash implementation
    const hashedPassword = `hashed-${password}`; // Just a simulation
    this.hashStore.set(password, hashedPassword);
    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    // Simulated comparison
    return this.hashStore.get(password) === hashedPassword;
  }
}
