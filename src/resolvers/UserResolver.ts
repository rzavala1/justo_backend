import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateUserInput } from "../dto/CreateUserInput";
import { UpdateUserInput } from "../dto/UpdateUserInput";
import { User } from "../models/User";
import bcrypt from 'bcryptjs';


@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await User.findAll();
    return users;
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
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado");
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password=hashedPassword;
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

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    if (!user) {
      return false;
    }

    await user.destroy();
    return true;
  }
}
