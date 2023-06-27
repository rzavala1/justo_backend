import { Model, Table, Column, ForeignKey, BelongsTo, DataType, AllowNull } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import sequelize from '../sequelize';
import { Manager } from './Manager';
import { User } from './User';

@ObjectType()
@Table
export class Hitman extends Model<Hitman> {
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

  @AllowNull(false)
  @ForeignKey(() => Manager)
  @Column(DataType.NUMBER)
  managerId!: number;

  @BelongsTo(() => Manager)
  manager!: Manager;
}

sequelize.addModels([Hitman]);


