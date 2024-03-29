import { Text, Button, SimpleGrid, Box, Image } from "@chakra-ui/react";
import moment from "moment";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchProduct } from "../../api";
import { useBasket } from "../../context/BasketContext";
function ProductDetail() {
  const { product_id } = useParams();
  const { isLoading, error, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find((item) => item._id === product_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>"An error has occurred: {error.message}</div>;
  }
  return (
    <div>
      <SimpleGrid columns={2} spacing={1}>
        <Box>
          <Image
            src={data.image}
            maxWidth="50%"
            objectFit="cover"
            alt={data.description}
            loading="lazy"
            mx="auto"
          />
        </Box>
        <Box
          p="3"
          w="100%"
          border="1px"
          borderColor="gray.200"
          borderWidth="1px"
          borderRadius="lg"
        >
          <Text as="h2" fontSize="2xl " mt="3">
            {data.title}
          </Text>
          <Text mt="3" fontSize="m">
            {moment(data.createdAt).format("DD/MM/YYYY")}{" "}
          </Text>
          <p>{data.description}</p>
          <Text mt="3" as="h3" fontSize="2xl">
            <Text as="s" mr="3" fontSize="medium">
              {(parseInt(data.price) * 1.2).toFixed(2)} ₺
            </Text>
            {data.price} ₺
          </Text>
          <Button
            w="50%"
            mt="3"
            leftIcon={
              findBasketItem ? <MdRemoveShoppingCart /> : <MdAddShoppingCart />
            }
            colorScheme={findBasketItem ? "red" : "gray"}
            onClick={() => addToBasket(data, findBasketItem)}
          >
            {findBasketItem ? "Remove from Basket" : "Add to basket"}
          </Button>
        </Box>
      </SimpleGrid>
    </div>
  );
}

export default ProductDetail;
