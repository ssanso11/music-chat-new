import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerStudent: StudentResponse;
  loginStudent: StudentResponse;
  updateStudent?: Maybe<Student>;
  deleteStudent: Scalars['Boolean'];
  registerTeacher: TeacherResponse;
  loginTeacher: TeacherResponse;
  updateTeacher?: Maybe<Teacher>;
  deleteTeacher: Scalars['Boolean'];
};


export type MutationRegisterStudentArgs = {
  options: StudentInput;
};


export type MutationLoginStudentArgs = {
  options: StudentInput;
};


export type MutationUpdateStudentArgs = {
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterTeacherArgs = {
  options: TeacherInput;
};


export type MutationLoginTeacherArgs = {
  options: TeacherInput;
};


export type MutationUpdateTeacherArgs = {
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteTeacherArgs = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  students: Array<Student>;
  student?: Maybe<Student>;
  me?: Maybe<Teacher>;
  teachers: Array<Teacher>;
  teacher?: Maybe<Teacher>;
};


export type QueryStudentArgs = {
  id: Scalars['Int'];
};


export type QueryTeacherArgs = {
  id: Scalars['Int'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type StudentInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  bio: Scalars['String'];
  instrument: Scalars['String'];
};

export type TeacherInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  bio: Scalars['String'];
  instrument: Scalars['String'];
  password: Scalars['String'];
};

export type TeacherResponse = {
  __typename?: 'TeacherResponse';
  errors?: Maybe<Array<FieldError>>;
  teacher?: Maybe<Teacher>;
};

export type RegisterStudentMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterStudentMutation = (
  { __typename?: 'Mutation' }
  & { registerStudent: (
    { __typename?: 'StudentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, student?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'email'>
    )> }
  ) }
);

export type RegisterTeacherMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  bio: Scalars['String'];
  instrument: Scalars['String'];
}>;


export type RegisterTeacherMutation = (
  { __typename?: 'Mutation' }
  & { registerTeacher: (
    { __typename?: 'TeacherResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, teacher?: Maybe<(
      { __typename?: 'Teacher' }
      & Pick<Teacher, 'id' | 'email'>
    )> }
  ) }
);


export const RegisterStudentDocument = gql`
    mutation RegisterStudent($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
  registerStudent(
    options: {email: $email, firstName: $firstName, lastName: $lastName, password: $password}
  ) {
    errors {
      field
      message
    }
    student {
      id
      email
    }
  }
}
    `;

export function useRegisterStudentMutation() {
  return Urql.useMutation<RegisterStudentMutation, RegisterStudentMutationVariables>(RegisterStudentDocument);
};
export const RegisterTeacherDocument = gql`
    mutation RegisterTeacher($email: String!, $firstName: String!, $lastName: String!, $password: String!, $bio: String!, $instrument: String!) {
  registerTeacher(
    options: {email: $email, firstName: $firstName, lastName: $lastName, password: $password, bio: $bio, instrument: $instrument}
  ) {
    errors {
      field
      message
    }
    teacher {
      id
      email
    }
  }
}
    `;

export function useRegisterTeacherMutation() {
  return Urql.useMutation<RegisterTeacherMutation, RegisterTeacherMutationVariables>(RegisterTeacherDocument);
};