import { Student } from "../entities/Student";
import { MyContext } from "../types";
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
class StudentInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;
}

// return type for student resolvers
@ObjectType()
class StudentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Student, { nullable: true })
  student?: Student;
}

@Resolver()
export class StudentResolver {
  // fetch all students in database
  @Query(() => [Student])
  students(@Ctx() { em }: MyContext): Promise<Student[]> {
    return em.find(Student, {});
  }

  // fetch student by id
  @Query(() => Student, { nullable: true })
  student(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Student | null> {
    return em.findOne(Student, { id });
  }

  //check to see who is logged in
  @Query(() => Student, { nullable: true })
  me(@Ctx() { em, req }: MyContext) {
    if (!req.session.userId) {
      return null; // you are not logged in
    }

    const user = em.findOne(Student, { id: req.session.userId });
    return user;
  }

  // register student into database
  @Mutation(() => StudentResponse)
  async registerStudent(
    @Arg("options") options: StudentInput,
    @Ctx() { em, req }: MyContext
  ): Promise<StudentResponse> {
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

    console.log(isEmailValid);
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
    const student = em.create(Student, {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      password: hashedPassword,
    });

    // duplicate user error handling, will check with email later
    try {
      // check 3:07:00 of https://www.youtube.com/watch?v=I6ypD7qv3Z8&t=3617s
      await em.persistAndFlush(student);
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
    req.session.userId = student.id;
    return { student };
  }

  // login + auth for students
  @Mutation(() => StudentResponse)
  async loginStudent(
    @Arg("options") options: StudentInput,
    @Ctx() { em, req }: MyContext
  ): Promise<StudentResponse> {
    const student = await em.findOne(Student, { email: options.email });

    // error handling if user doesn't exist
    if (!student) {
      return {
        errors: [
          {
            field: "email",
            message: "Invalid email login",
          },
        ],
      };
    }
    const valid = await argon2.verify(student.password, options.password);

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

    req.session.userId = student.id;

    return {
      student,
    };
  }

  // update student profile, will have to modify later
  @Mutation(() => Student, { nullable: true })
  async updateStudent(
    @Arg("id", () => Int) id: number,
    @Arg("email", () => String, { nullable: true }) email: string,
    @Ctx() { em }: MyContext
  ): Promise<Student | null> {
    const student = await em.findOne(Student, { id });
    if (!student) {
      return null;
    }
    if (typeof email !== "undefined") {
      student.email = email;
      await em.persistAndFlush(student);
    }
    return student;
  }

  // delete student profile by id
  @Mutation(() => Boolean)
  async deleteStudent(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Student, { id });
      return true;
    } catch {
      return false;
    }
  }
}
