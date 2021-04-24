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
};


export type MutationRegisterStudentArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginStudentArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateStudentArgs = {
  name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  students: Array<Student>;
  student?: Maybe<Student>;
  me?: Maybe<Student>;
};


export type QueryStudentArgs = {
  id: Scalars['Int'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type UsernamePasswordInput = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerStudent: (
    { __typename?: 'StudentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, student?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'name'>
    )> }
  ) }
);


export const RegisterDocument = gql`
    mutation Register($name: String!, $password: String!) {
  registerStudent(options: {name: $name, password: $password}) {
    errors {
      field
      message
    }
    student {
      id
      name
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};