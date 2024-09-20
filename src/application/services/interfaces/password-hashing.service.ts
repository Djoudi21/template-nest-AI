export interface IPasswordHashingService {
  hash(password: string): Promise<string>;
  compare(plainText: string, hash: string): Promise<boolean>;
}
