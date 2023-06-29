import { Resolver, Mutation, Arg } from "type-graphql";
import { login } from "../controllers/AuthController";
import { UserOutput } from "../dto/UserOutput";
import { User } from "../models/User";

@Resolver()
export class AuthResolver {

  @Mutation(() => UserOutput)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<UserOutput | null> {
    const token = await login(email, password);
    const user = await User.findOne({ where: { email } });
    
    const userOutput = new UserOutput();
    userOutput.token = token;
    userOutput.user = user ?? undefined;
    return userOutput;
  }

}


/*@Mutation(() => UserOutput)
async loginUser(
  @Arg("email") email: string,
  @Arg("password") password: string
): Promise<UserOutput | null> {
  const token = await login(email, password);
  const user = await User.findOne({ where: { email } });
  const userOutput = new UserOutput();
  userOutput.token = token;
  if(user)
  userOutput.user = user;
  return userOutput;
}*/