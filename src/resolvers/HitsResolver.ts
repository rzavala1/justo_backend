import { Op } from "sequelize";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { CreateHitInput } from "../dto/CreateHitInput";
import { UpdateHitInput } from "../dto/UpdateHitInput";
import Hierarchy from "../models/Hierarchy";
import { Hit } from "../models/Hit";
import { User } from "../models/User";

export interface MyContext {
  req: Request;
  res: Response;
  user?: any;
}

@Resolver()
export class HitsResolver {
  @Query(() => [Hit])
  async hits(@Ctx() context: MyContext): Promise<Hit[]> {
    const { user } = context;
    const userSave = await User.findByPk(user?.userId);

    switch (userSave?.roleId) {
      case 1: //boss
        const allHits = await Hit.findAll({
          include: ['assignUser', 'createUser'],
        });
        return allHits;

      case 2: //manager
        const hierarchy = await Hierarchy.findAll({
          where: {
            parentId: userSave?.id,
          },
        });

        const hitmanIds = hierarchy.map((item) => item.childId);

        const hits = await Hit.findAll({
          include: ['assignUser', 'createUser'],
          where: {
            assignId: {
              [Op.in]: hitmanIds,
            },
          },
        });
        return hits;

      case 3:
        const hitsForHitman = await Hit.findAll({
          include: ['assignUser', 'createUser'],
          where: { assignId: userSave!.id },
        });
        return hitsForHitman;

      default:
        return [];
    }
  }


  @Mutation(() => Hit)
  async createHit(@Arg("data") data: CreateHitInput, @Ctx() context: MyContext): Promise<Hit> {
    const { user } = context;
    const userSave = await User.findByPk(user?.userId);
    if(userSave?.roleId!==3){
      const hit = await Hit.create(data as Hit);
      return hit;
    }
    throw new Error("Invalid");
  }

  @Query(() => Hit)
  async hit(@Arg("id") id: number): Promise<Hit | null> {
    const hit = await Hit.findOne({
      where: { id },
      include: ['assignUser', 'createUser'],
    });
    return hit;
  }

  @Mutation(() => Hit)
  async updateHit(
    @Arg("id") id: number,
    @Arg("data") data: UpdateHitInput
  ): Promise<Hit | null> {
    const hit = await Hit.findByPk(id);
    if (!hit) {
      return null;
    }

    await hit.update(data);
    return hit;
  }

  @Mutation(() => Boolean)
  async deleteHit(@Arg("id") id: number): Promise<boolean> {
    const hit = await Hit.findByPk(id);
    if (!hit) {
      return false;
    }

    await hit.destroy();
    return true;
  }
}
