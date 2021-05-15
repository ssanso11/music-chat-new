import { Box, Button, FormLabel } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import {
  useRegisterStudentMutation,
  useRegisterTeacherMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, registerStudent] = useRegisterStudentMutation();
  const [, registerTeacher] = useRegisterTeacherMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          userType: "",
          email: "",
          firstName: "",
          lastName: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          if (values.userType == "student") {
            const response = await registerStudent({
              email: values.email,
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
            });

            if (response.data?.registerStudent.errors) {
              setErrors(toErrorMap(response.data.registerStudent.errors));
            } else if (response.data?.registerStudent.student) {
              // successfully registered
              router.push("/");
            }
          } else {
            const response = await registerTeacher({
              email: values.email,
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
              bio: "Hi, I'm bob",
              instrument: "Clarinet",
            });

            if (response.data?.registerTeacher.errors) {
              setErrors(toErrorMap(response.data.registerTeacher.errors));
            } else if (response.data?.registerTeacher.teacher) {
              // successfully registered
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <FormLabel>Teacher or Student</FormLabel>
              <Field as="select" name="userType">
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </Field>
            </Box>
            <Box mt={4}>
              <InputField name="email" placeholder="Email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="firstName"
                placeholder="First Name"
                label="First Name"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
