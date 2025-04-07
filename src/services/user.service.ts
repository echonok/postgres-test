import { AppDataSource } from '../database';
import { User } from '../entities/User.entity';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers() {
    return this.userRepository.find();
  }

  async createUser(name: string, email: string) {
    const user = this.userRepository.create({ name, email });
    return this.userRepository.save(user);
  }

  async getUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(id: number, updates: Partial<User>) {
    await this.userRepository.update(id, updates);
    return this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return { message: 'User deleted successfully' };
  }
}
