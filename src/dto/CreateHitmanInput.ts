import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateHitmanInput {
  @Field()
  userId!: number;

  @Field()
  managerId!: number;
}