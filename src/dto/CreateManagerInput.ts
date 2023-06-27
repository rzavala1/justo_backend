import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateManagerInput {
  @Field()
  userId!: number;

  @Field()
  bossId!: number;
}