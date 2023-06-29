import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { CreateUserInput } from "../dto/CreateUserInput";
import { UpdateUserInput } from "../dto/UpdateUserInput";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { MyContext } from "./HitsResolver";
import Hierarchy from "../models/Hierarchy";
import { Op } from "sequelize";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() context: MyContext): Promise<User[]> {
    const { user } = context;
    const userSave = await User.findByPk(user?.userId);

    switch (userSave?.roleId) {
      case 1: //boss
      console.info("boss")
        const allUsers = await User.findAll({
          where: {
            roleId: 3,
          },
        });
        return allUsers;

      case 2: //manager
        const hierarchy = await Hierarchy.findAll({
          where: {
            parentId: userSave?.id,
          },
        });
       
        const hitmanIds = hierarchy.map((item) => item.childId);
        const all = await User.findAll({
          where: {
            id: {
              [Op.in]: hitmanIds,
            },
          },
        });

        return all;

      default:
        return [];
    }
  }

  @Query(() => User)
  async user(@Arg("id") id: number): Promise<User | null> {
    const user = await User.findByPk(id);
    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("userData", () => CreateUserInput) userData: CreateUserInput
  ): Promise<User> {
    //verficar que no se este utilizado el correo
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
    const user = await User.create(userData as User);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("userData", () => UpdateUserInput) userData: UpdateUserInput
  ): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    Object.assign(user, userData);
    await user.save();

    return user;
  }

}
