import { Box, Text, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { useBasket } from "../../context/BasketContext";
import moment from "moment";
function Card({ item }) {
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3" pb="1">
      <Link to={`/product/${item._id}`}>
        <Box height="30vh">
          <Image
            src={item.image}
            height="100%"
            width="100%"
            objectFit="scale-down"
            alt={item.description}
            loading="lazy"
            mx="auto"
            alignSelf="center"
          />
        </Box>
        <Box p="6">
          <Box d="plex" alignItems="baseline">
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </Box>

          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item.title}
          </Box>

          <Box>
            <Text as="s" mr="3" fontSize="medium">
              {(parseInt(item.price) * 1.2).toFixed(2)} ₺
            </Text>
            {item.price} ₺
          </Box>
        </Box>
      </Link>
      <Button
        mb="4"
        leftIcon={
          findBasketItem ? <MdRemoveShoppingCart /> : <MdAddShoppingCart />
        }
        colorScheme={findBasketItem ? "red" : "gray"}
        onClick={() => addToBasket(item, findBasketItem)}
      >
        {findBasketItem ? "Remove from Basket" : "Add to basket"}
      </Button>
    </Box>
  );
}

export default Card;
