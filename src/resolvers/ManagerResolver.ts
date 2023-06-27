import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { CreateManagerInput } from '../dto/CreateManagerInput';
import { UpdateManagerInput } from '../dto/UpdateManagerInput';
import { Manager } from '../models/Manager';

@Resolver()
export class ManagerResolver {
  @Query(() => [Manager])
  async managers(): Promise<Manager[]> {
    const managers = await Manager.findAll();
    return managers;
  }

  @Query(() => Manager)
  async manager(@Arg('id') id: number): Promise<Manager | null> {
    const manager = await Manager.findByPk(id);
    return manager;
  }

  @Mutation(() => Manager)
  async createManager(@Arg('data') data: CreateManagerInput): Promise<Manager> {
    const manager = await Manager.create(data as Manager);
    return manager;
  }

  @Mutation(() => Manager)
  async updateManager(
    @Arg('id') id: number,
    @Arg('data') data: UpdateManagerInput 
  ): Promise<Manager | null> {
    const manager = await Manager.findByPk(id);
    if (!manager) {
      return null;
    }
    await manager.update(data);
    return manager;
  }

  @Mutation(() => Boolean)
  async deleteManager(@Arg('id') id: number): Promise<boolean> {
    const manager = await Manager.findByPk(id);
    if (!manager) {
      return false;
    }

    await manager.destroy();
    return true;
  }
}
