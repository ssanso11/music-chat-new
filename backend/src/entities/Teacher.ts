import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Teacher {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text" })
  email!: string;

  @Field()
  @Property({ type: "text" })
  firstName!: string;

  @Field()
  @Property({ type: "text" })
  lastName!: string;

  @Field()
  @Property({ type: "text" })
  bio!: string;

  @Field()
  @Property({ type: "text" })
  instrument!: string;

  @Property({ type: "text" })
  password!: string;
}
