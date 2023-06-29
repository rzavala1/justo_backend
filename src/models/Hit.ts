import {
  Model,
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import sequelize from "../sequelize";
import { User } from "./User";

@ObjectType()
@Table({ tableName: "hits" })
export class Hit extends Model<Hit> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Field()
  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;

  @Field()
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.ENUM("assigned", "completed", "failed"),
    defaultValue: "assigned",
  })
  status!: string;

  @Field()
  @CreatedAt
  @Column(DataType.DATE)
  createdAt?: Date;

  @Field()
  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt?: Date;

  @Field()
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  createId!: number;

  @Field()
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  assignId!: number;

  @Field(() => User)
  @BelongsTo(() => User, { foreignKey: "assignId", as: "assignUser" })
  assignUser!: User;

  @Field(() => User)
  @BelongsTo(() => User, { foreignKey: "createId", as: "createUser" })
  createUser!: User;
}

sequelize.addModels([Hit]);
