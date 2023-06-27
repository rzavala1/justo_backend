import { Model, Table, Column, ForeignKey, BelongsTo, DataType, AllowNull } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import sequelize from '../sequelize';
import { Boss } from './Boss';
import { User } from './User';

@ObjectType()
@Table
export class Manager extends Model<Manager> {
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
  @ForeignKey(() => Boss)
  @Column(DataType.NUMBER)
  bossId!: number;

  @BelongsTo(() => Boss)
  boss!: Boss;

}

sequelize.addModels([Manager]);