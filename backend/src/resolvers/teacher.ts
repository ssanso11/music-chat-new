import { MyContext } from "../types";
import { Teacher } from "../entities/Teacher";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import validate from "deep-email-validator";
import { FieldError } from "../entities/Error";

// input type for creating user
@InputType()
class TeacherInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  bio: string;

  @Field()
  instrument: string;

  @Field()
  password: string;
}

// // object type for error messages
// @ObjectType()
// class TeacherFieldError {
//   @Field()
//   field: string;

//   @Field()
//   message: string;
// }
// return type for student resolvers
@ObjectType()
class TeacherResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Teacher, { nullable: true })
  teacher?: Teacher;
}

@Resolver()
export class TeacherResolver {
  // fetch all teachers in database
  @Query(() => [Teacher])
  teachers(@Ctx() { em }: MyContext): Promise<Teacher[]> {
    return em.find(Teacher, {});
  }

  // fetch teacher by id
  @Query(() => Teacher, { nullable: true })
  teacher(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Teacher | null> {
    return em.findOne(Teacher, { id });
  }

  // check to see who is logged in
  @Query(() => Teacher, { nullable: true })
  me(@Ctx() { em, req }: MyContext) {
    if (!req.session.userId) {
      return null; // you are not logged in
    }

    const user = em.findOne(Teacher, { id: req.session.userId });
    return user;
  }

  // register student into database
  @Mutation(() => TeacherResponse)
  async registerTeacher(
    @Arg("options") options: TeacherInput,
    @Ctx() { em, req }: MyContext
  ): Promise<TeacherResponse> {
    // email error handling
    const isEmailValid = await validate({
      email: options.email,
      sender: options.email,
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: false,
    });

    if (options.email.length == 0 || !isEmailValid.valid) {
      return {
        errors: [
          {
            field: "email",
            message: "Invalid email address",
          },
        ],
      };
    }

    // check if firstName is empty
    if (options.firstName.length == 0) {
      return {
        errors: [
          {
            field: "firstName",
            message: "Please include your first name",
          },
        ],
      };
    }

    // check if lastName is empty
    if (options.lastName.length == 0) {
      return {
        errors: [
          {
            field: "lastName",
            message: "Please include your last name",
          },
        ],
      };
    }

    // check if lastName is empty
    if (options.instrument.length == 0) {
      return {
        errors: [
          {
            field: "instrument",
            message: "Oops! You forgot an instrument",
          },
        ],
      };
    }

    // check if lastName is empty
    if (options.bio.length == 0) {
      return {
        errors: [
          {
            field: "bio",
            message: "Please add a short bio",
          },
        ],
      };
    }

    // password length error handling, maybe use validator lib later
    if (options.password.length <= 5) {
      return {
        errors: [
          {
            field: "password",
            message: "password length must be greater than 5 characters",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const teacher = em.create(Teacher, {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      bio: options.bio,
      instrument: options.instrument,
      password: hashedPassword,
    });

    // duplicate user error handling, will check with email later
    try {
      // check 3:07:00 of https://www.youtube.com/watch?v=I6ypD7qv3Z8&t=3617s
      await em.persistAndFlush(teacher);
    } catch (err) {
      if (err.code === "23505") {
        // duplicate name error
        return {
          errors: [
            {
              field: "email",
              message: "Email already in use",
            },
          ],
        };
      }
    }
    req.session.userId = teacher.id;
    return { teacher };
  }

  // login + auth for students
  @Mutation(() => TeacherResponse)
  async loginTeacher(
    @Arg("options") options: TeacherInput,
    @Ctx() { em, req }: MyContext
  ): Promise<TeacherResponse> {
    const teacher = await em.findOne(Teacher, { email: options.email });

    // error handling if user doesn't exist
    if (!teacher) {
      return {
        errors: [
          {
            field: "email",
            message: "Invalid email login",
          },
        ],
      };
    }
    const valid = await argon2.verify(teacher.password, options.password);

    // throw error if incorrect password
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }

    req.session.userId = teacher.id;

    return {
      teacher,
    };
  }

  // update teacher profile, will have to modify later
  @Mutation(() => Teacher, { nullable: true })
  async updateTeacher(
    @Arg("id", () => Int) id: number,
    @Arg("email", () => String, { nullable: true }) email: string,
    @Ctx() { em }: MyContext
  ): Promise<Teacher | null> {
    const teacher = await em.findOne(Teacher, { id });
    if (!teacher) {
      return null;
    }
    if (typeof email !== "undefined") {
      teacher.email = email;
      await em.persistAndFlush(teacher);
    }
    return teacher;
  }

  // delete teacher profile by id
  @Mutation(() => Boolean)
  async deleteTeacher(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Teacher, { id });
      return true;
    } catch {
      return false;
    }
  }
}
