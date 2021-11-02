import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";
import moment from "moment";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Heading,
} from "@chakra-ui/react";
function Orders() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }

  //const total = data.items.reduce((acc, obj) => acc + obj.price, 0);
  return (
    <div>
      <Heading textAlign="center">Orders</Heading>
      <Table variant="simple">
        <TableCaption>E-Commerce React Orders</TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center">User</Th>
            <Th textAlign="center">Address</Th>
            <Th textAlign="center">Item Count</Th>
            <Th textAlign="center">Total</Th>
            <Th textAlign="center">Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Th textAlign="center">{item.user.email}</Th>
              <Th textAlign="center">{item.address}</Th>
              <Th textAlign="center">{item.items.length}</Th>
              <Th textAlign="center">
                {Math.round(
                  item.items.reduce((acc, obj) => acc + obj.price, 0)
                )}{" "}
                ₺
              </Th>
              <Th textAlign="center">
                {moment(item.createdAt).format("DD:MM:YYYY, hh:mm:ss")}
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Orders;
