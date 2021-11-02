import React from "react";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "react-query";
import { fetchProduct, updateProduct } from "../../../api";
import validationSchema from "./validations";
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { Alert, message } from "antd";
import { Formik /* ,FieldArray */ } from "formik";
function NewProduct() {
  const handleSubmit = async (values, bag) => {
    console.log("added");
  };
  return (
    <div>
      <Heading mt={0} textAlign="center">
        Product Edit
      </Heading>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      value={values.title}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.title && errors.title}
                    ></Input>
                    {touched.title && errors.title && (
                      <Box mt={2}>
                        <Alert message={errors.title} type="error" showIcon />
                      </Box>
                    )}
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={values.description}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.description && errors.description}
                    ></Textarea>
                    {touched.description && errors.description && (
                      <Box mt={2}>
                        <Alert
                          message={errors.description}
                          type="error"
                          showIcon
                        />
                      </Box>
                    )}
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      value={values.price}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={touched.price && errors.price}
                    ></Input>
                    {touched.price && errors.price && (
                      <Box mt={2}>
                        <Alert message={errors.price} type="error" showIcon />
                      </Box>
                    )}
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Photos</FormLabel>
                    <FormControl>
                      <Input
                        name="photos"
                        value={values.photos}
                        disabled={isSubmitting}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      ></Input>
                    </FormControl>

                    <Button
                      mt={5}
                      width="full"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Save
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;
