import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Hitman } from '../models/Hitman';
import { CreateHitmanInput } from '../dto/CreateHitmanInput';
import { UpdateHitmanInput } from '../dto/UpdateHitmanInput';

@Resolver()
export class HitmanResolver {
  @Query(() => [Hitman])
  async hitmen(): Promise<Hitman[]> {
    const hitmen = await Hitman.findAll();
    return hitmen;
  }

  @Query(() => Hitman)
  async hitman(@Arg('id') id: number): Promise<Hitman | null> {
    const hitman = await Hitman.findByPk(id);
    return hitman;
  }

  @Mutation(() => Hitman)
  async createHitman(@Arg('data') data: CreateHitmanInput): Promise<Hitman> {
    const hitman = await Hitman.create(data as Hitman);
    return hitman;
  }

  @Mutation(() => Hitman)
  async updateHitman(
    @Arg('id') id: number,
    @Arg('data') data: UpdateHitmanInput
  ): Promise<Hitman | null> {
    const hitman = await Hitman.findByPk(id);
    if (!hitman) {
      return null;
    }

    await hitman.update(data);
    return hitman;
  }

  @Mutation(() => Boolean)
  async deleteHitman(@Arg('id') id: number): Promise<boolean> {
    const hitman = await Hitman.findByPk(id);
    if (!hitman) {
      return false;
    }

    await hitman.destroy();
    return true;
  }
}
