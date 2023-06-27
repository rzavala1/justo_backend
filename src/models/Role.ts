import { Model, Table, Column, DataType, AllowNull } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import sequelize from '../sequelize';

@ObjectType()
@Table
export class Role extends Model<Role>{
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
}

sequelize.addModels([Role]);

export default Role;
