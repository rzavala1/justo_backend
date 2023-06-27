import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class UpdateHitmanInput {
  @Field()
  userId!: number;

  @Field()
  managerId?: number;
}
