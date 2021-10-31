import { Link } from "react-router-dom";
import { Alert, Image, Button, Box, Heading, Text } from "@chakra-ui/react";
import { useBasket } from "../../context/BasketContext";

import { MdOutlineDeleteOutline } from "react-icons/md";
function Basket() {
  const { items, removeFromBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);
  return (
    <div>
      <Box mb="3">
        <Heading>Basket</Heading>
      </Box>
      {items.length < 1 && (
        <Alert status="warning">You don't have any items in your basket!</Alert>
      )}
      {items.length > 0 && (
        <>
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                <Box
                  display="flex"
                  alignContent="space-evenly"
                  alignItems="center"
                  border="1px"
                  borderColor="gray.200"
                  marginBottom="3"
                  paddingRight="2"
                >
                  <Box>
                    <Button
                      colorScheme="red"
                      variant="link"
                      size="lg"
                      onClick={() => removeFromBasket(item._id)}
                    >
                      {<MdOutlineDeleteOutline />}
                    </Button>
                  </Box>
                  <Box mx="2">
                    <Link to={`/product/${item._id}`}>
                      {" "}
                      <Image
                        height="64px"
                        width="64px"
                        objectFit="scale-down"
                        loading="lazy"
                        src={item.image}
                        alt={item.title}
                      ></Image>
                    </Link>
                  </Box>
                  <Link to={`/product/${item._id}`}>
                    <Box>
                      <Box>{item.title}</Box>
                      <Box> {item.price} ₺</Box>
                    </Box>
                  </Link>
                </Box>
              </li>
            ))}
          </ul>
          <Box>
            <Text display="inline-flex">
              Subtotal ({items.length} {items.length > 1 ? "items" : "item"}):{" "}
              <Text fontWeight="bold"> {total} ₺</Text>
            </Text>
          </Box>
        </>
      )}
    </div>
  );
}

export default Basket;
