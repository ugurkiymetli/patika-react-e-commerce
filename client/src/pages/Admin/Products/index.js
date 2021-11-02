import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProductList, deleteProduct } from "../../../api";

import { Table, Popconfirm } from "antd";
import { Box, Heading, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdAdd } from "react-icons/md";
function Products() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    "admin-products",
    fetchProductList
  );
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin-products"),
  });
  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        /* key: "createdAt", */
        render: (record) => (
          <>{moment(record.createdAt).format("DD:MM:YYYY, hh:mm:ss")}</>
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => (
          <Box display="flex" justifyContent="space-around">
            <Link to={`/admin/products/${record._id}`}>
              <Button colorScheme="gray" variant="outline">
                Edit
              </Button>
            </Link>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log(`Product ${record.title} deleted!`);
                  },
                });
              }}
              //    ,
              //   ,

              onCancel={() => console.log("Canceled!")}
            >
              <Button colorScheme="red" variant="outline">
                Delete
              </Button>
            </Popconfirm>
          </Box>
        ),
      },
    ];
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <Heading textAlign="center">Products</Heading>
        <Link to="/admin/products/new">
          <Button leftIcon={<MdAdd />}>New Product</Button>
        </Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey="_id"></Table>
    </div>
  );
}

export default Products;
