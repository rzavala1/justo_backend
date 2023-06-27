import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class UpdateManagerInput {
  @Field()
  userId!: number;

  @Field()
  bossId?: number;
}
