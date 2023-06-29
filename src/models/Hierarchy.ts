import { Model, Table, Column, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import sequelize from '../sequelize';
import { User } from './User';

@ObjectType()
@Table({ tableName: 'hierarchy' }) 
export class Hierarchy extends Model<Hierarchy>{
  @Field()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;
  
  @Field()
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  parentId!: number;

  @Field()
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  childId!: number;

  @Field(() => User)
  @BelongsTo(() => User, 'parentId')
  manager!: User;

  @Field(() => User)
  @BelongsTo(() => User, 'childId')
  hitman!: User;
  
}

sequelize.addModels([Hierarchy]);

export default Hierarchy;
