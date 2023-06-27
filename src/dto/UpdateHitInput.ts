import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateHitInput {
  @Field({ nullable: true })
  target?: string;

  @Field({ nullable: true })
  status?: string;

  @Field()
  hitmanId?: number;
}
