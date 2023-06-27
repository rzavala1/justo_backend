import { Model, Table, Column, DataType, AllowNull, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import sequelize from '../sequelize';
import { Role } from './Role';

@ObjectType()
@Table
export class User extends Model<User> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;
  
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column(DataType.NUMBER)
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

}
sequelize.addModels([User]);
