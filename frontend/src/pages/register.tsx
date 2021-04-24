import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ name: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            name: values.name,
            password: values.password,
          });
          if (response.data?.registerStudent.errors) {
            setErrors(toErrorMap(response.data.registerStudent.errors));
          } else if (response.data?.registerStudent.student) {
            // successfully registered
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="name" placeholder="Name" label="Name" />
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
