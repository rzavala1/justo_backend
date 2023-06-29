import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateHitInput {

  @Field()
  description?: string;

  @Field()
  name?: string;

  @Field()
  status!: string;

  @Field()
  assignId?: number;

  @Field()
  createId?: number;
}
