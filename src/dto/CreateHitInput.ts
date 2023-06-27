import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateHitInput {
  @Field()
  target!: string;

  @Field({ nullable: true })
  status?: string;

  @Field()
  hitmanId?: number;
}
