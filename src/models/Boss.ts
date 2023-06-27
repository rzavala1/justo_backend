import { Model, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import sequelize from '../sequelize';
import { User } from './User';

@Table({ tableName: 'boss' })
export class Boss extends Model<Boss> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

sequelize.addModels([Boss]);