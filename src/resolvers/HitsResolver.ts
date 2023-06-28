import { Op } from "sequelize";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { CreateHitInput } from "../dto/CreateHitInput";
import { UpdateHitInput } from "../dto/UpdateHitInput";
import { Hit } from "../models/Hit";
import { Hitman } from "../models/Hitman";
import { Manager } from "../models/Manager";
import { User } from "../models/User";

export interface MyContext {
  req: Request;
  res: Response;
  user?: any;
}

@Resolver()
export class HitsResolver {
  /*@Query(() => [Hit])
  async hits(): Promise<Hit[]> {
    const hits = await Hit.findAll();
    return hits;
  }*/

  @Query(() => [Hit])
  async hits(@Ctx() context: MyContext): Promise<Hit[]> {
    const { user } = context;
    const userSave = await User.findByPk(user?.userId);
    console.info("este es el rol", userSave!.roleId);

    switch (userSave?.roleId) {
      case 1: //boss
        const allHits = await Hit.findAll({
          include: [{ model: Hitman, include: [User] }],
        });
        return allHits;
      case 3:
        const hitsForHitman = await Hit.findAll({
          where: { hitmanId: userSave!.id },
        });
        return hitsForHitman;

      /*case 3:
        const hitsForHitman = await Hit.findAll({
          where: { hitmanId: userSave!.id },
        });
        return hitsForHitman;s

      case 2:
        const hitsForManager = await Hit.findAll({
          include: {
            model: Manager,
            where: {
              [Op.or]: [
                { id: userSave!.id }, // Hits asignados al Manager
                { hitmanId: userSave!.id }, // Hits asignados a los lacayos del Manager (si aplica)
              ],
            },
          },
        });
        return hitsForManager;

      case 1:
        // Obtener todos los hits
        const allHits = await Hit.findAll();
        return allHits;*/

      default:
        // Si el rol no coincide con ninguno de los casos anteriores, retornar un array vacío o lanzar un error según tu requerimiento
        return [];
    }
  }

  @Query(() => Hit)
  async hit(@Arg("id") id: number): Promise<Hit | null> {
    const hit = await Hit.findByPk(id);
    return hit;
  }

  @Mutation(() => Hit)
  async createHit(@Arg("data") data: CreateHitInput): Promise<Hit> {
    const hit = await Hit.create(data as Hit);
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
