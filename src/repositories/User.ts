import { EntityRepository, Repository } from "typeorm";
import { User } from "@models";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    
  public async updateUser(
    id: string,
    user: User,
  ): Promise<User | unknown> {
    try {
      await this.update(id, user);
      const updateduser = await this.findOne(id);

      return updateduser;
    } catch (error) {
      return error;
    }
  }
}