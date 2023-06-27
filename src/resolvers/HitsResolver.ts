import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { CreateHitInput } from '../dto/CreateHitInput';
import { UpdateHitInput } from '../dto/UpdateHitInput';
import { Hit } from '../models/Hit';

@Resolver()
export class HitsResolver {
  @Query(() => [Hit])
  async hits(): Promise<Hit[]> {
    const hits = await Hit.findAll();
    return hits;
  }

  @Query(() => Hit)
  async hit(@Arg('id') id: number): Promise<Hit | null> {
    const hit = await Hit.findByPk(id);
    return hit;
  }

  @Mutation(() => Hit)
  async createHit(@Arg('data') data: CreateHitInput): Promise<Hit> {
    const hit = await Hit.create(data as Hit);
    return hit;
  }

  @Mutation(() => Hit)
  async updateHit(
    @Arg('id') id: number,
    @Arg('data') data: UpdateHitInput
  ): Promise<Hit | null> {
    const hit = await Hit.findByPk(id);
    if (!hit) {
      return null;
    }

    await hit.update(data);
    return hit;
  }

  @Mutation(() => Boolean)
  async deleteHit(@Arg('id') id: number): Promise<boolean> {
    const hit = await Hit.findByPk(id);
    if (!hit) {
      return false;
    }

    await hit.destroy();
    return true;
  }
}
