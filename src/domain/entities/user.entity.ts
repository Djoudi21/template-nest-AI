export class UserEntity {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id?: string,
    email?: string,
    password?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  setPassword(password: string): void {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    this.password = password;
  }
}
