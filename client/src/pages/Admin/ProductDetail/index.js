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
function ProductDetail() {
  const queryClient = useQueryClient();
  const { product_id } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const handleSubmit = async (values, bag) => {
    console.log("submitted");
    message.loading({ content: "Loading...", key: "product-update" });
    try {
      await updateProduct(values, product_id);
      queryClient.invalidateQueries("admin-products");
      message.success({
        content: "The product is updated!",
        key: "product-update",
        duration: 2,
      });
    } catch (error) {
      message.error("The product has not updated!");
    }
  };
  console.log(data);
  return (
    <div>
      <Heading textAlign="center">Product Edit</Heading>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.image,
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
                    {/* 
                    if we had photos array instead of one image url 
                    we would use the code below 
                    to list all the photo url's and buttons to remove them 
                    */}
                    {/* <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <Box>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <Box key={index} display="flex">
                                <Input
                                  name={`photos.${index}`}
                                  values={photo}
                                  disabled={isSubmitting}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                ></Input>
                                <Button
                                  ml="4"
                                  type="button"
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </Box>
                            ))}
                        </Box>
                        <Button mt="5" onClick={()=>arrayHelpers.push("")}> Add a photo </Button>
                      )}
                    /> */}
                    <Button
                      mt={5}
                      width="full"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Update
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

export default ProductDetail;
