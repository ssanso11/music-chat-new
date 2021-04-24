import { ObjectType, Field } from "type-graphql";

// object type for error messages
@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
