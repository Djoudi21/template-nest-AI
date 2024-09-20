import * as bcrypt from 'bcrypt';
import { IPasswordHashingService } from '../interfaces/password-hashing.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptPasswordHashingService implements IPasswordHashingService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}
