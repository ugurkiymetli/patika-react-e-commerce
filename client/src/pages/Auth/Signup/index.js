import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Alert,
} from "@chakra-ui/react";
import validationSchema from "./validations";
import { fetchRegister } from "../../../api";
import { useAuth } from "../../../context/AuthContext";
function SignUp({ history }) {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });
        login(registerResponse);

        history.push("/profile");

        console.log(registerResponse);
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });
  return (
    <div>
      <Flex align="center" justifyContent="center" width="full">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Register</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                ></Input>
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                ></Input>
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                ></Input>
              </FormControl>
              <Button mt="4" width="full" type="submit">
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignUp;
