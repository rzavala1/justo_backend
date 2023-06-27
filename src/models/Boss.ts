import { Model, Table, Column, ForeignKey, BelongsTo, DataType, AllowNull } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import sequelize from '../sequelize';
import { User } from './User';

@ObjectType()
@Table
export class Boss extends Model<Boss> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

sequelize.addModels([Boss]);