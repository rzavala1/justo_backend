import { Resolver, Mutation, Arg } from "type-graphql";
import { login } from "../controllers/AuthController";
import { User } from "../models/User";

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String | null> {
    const token = await login(email, password);
    return token;
  }
}
