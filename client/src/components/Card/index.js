import { Box, Text, Image, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import moment from "moment";
function Card({ item }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3" pb="1">
      <Link to={`/product/${item._id}`}>
        <Box height="40%">
          <Image
            src={item.image}
            maxHeight="100%"
            objectFit="cover"
            alt={item.description}
            loading="lazy"
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
              {parseInt(item.price).toPrecision(2) * 1.2}₺
            </Text>
            {item.price} ₺
          </Box>
        </Box>
      </Link>
      <Button leftIcon={<MdShoppingBasket />}>Add to basket</Button>
    </Box>
  );
}

export default Card;
