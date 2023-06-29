import { Field, ObjectType } from "type-graphql";
import { User } from "../models/User";

@ObjectType()
export class UserOutput {
  @Field()
  user?: User;

  @Field()
  token?: string;
}
