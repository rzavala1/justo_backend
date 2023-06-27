import { Model, Table, Column, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import sequelize from '../sequelize';
import { Hitman } from './Hitman';

@ObjectType()
@Table
export class Hit extends Model<Hit> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  target!: string;


  @AllowNull(false)
  @Column({
    type: DataType.ENUM('assigned', 'completed', 'failed'),
    defaultValue: 'assigned',
  })
  status!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @AllowNull(false)
  @ForeignKey(() => Hitman)
  @Column(DataType.NUMBER)
  hitmanId!: number;

  @BelongsTo(() => Hitman)
  hitman!: Hitman;
}

sequelize.addModels([Hit]);
