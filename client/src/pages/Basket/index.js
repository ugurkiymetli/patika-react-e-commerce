import React, { useRef, useState } from "react";
import { postOrder } from "../../api";
import { Link } from "react-router-dom";
import {
  Alert,
  Image,
  Button,
  Box,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useBasket } from "../../context/BasketContext";
import { MdOutlineDeleteOutline } from "react-icons/md";

function Basket() {
  //basket
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = Math.round(items.reduce((acc, obj) => acc + obj.price, 0));
  //modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  //order
  const [address, setAddress] = useState();
  const handleSubmitForm = async () => {
    const itemIDs = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIDs),
    };
    await postOrder(input);
    emptyBasket();
    onClose();
  };
  return (
    <div>
      <Box mb="3">
        <Heading>Basket</Heading>
        {items.length > 0 && (
          <>
            <Button colorScheme="green" size="sm" mt="2" onClick={onOpen}>
              Order ({items.length} {items.length > 1 ? "items" : "item"})
            </Button>{" "}
            <Box mt="2">
              <Text display="inline-flex">
                Subtotal: <span style={{ fontWeight: "bold" }}> {total} ₺</span>
              </Text>
            </Box>
          </>
        )}
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
                      <Box>
                        {item.title} -{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {item.price} ₺
                        </span>
                      </Box>
                    </Box>
                  </Link>
                </Box>
              </li>
            ))}
          </ul>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="x-large">Order</ModalHeader>
              <hr />
              <ModalCloseButton />
              <ModalBody pb={0}>
                <ul>
                  {items.map((item) => (
                    <li
                      key={item._id}
                      style={{
                        fontSize: "14px",
                        listStyleType: "decimal",
                        marginLeft: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      {item.title} -{" "}
                      <span style={{ fontWeight: "bold" }}>{item.price} ₺</span>
                    </li>
                  ))}
                </ul>
                <hr />
                <FormControl>
                  <FormLabel>Address: </FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter alignItems="center">
                <Text display="inline" mr={2}>
                  Total: <span style={{ fontWeight: "bold" }}>{total} ₺</span>{" "}
                </Text>
                <Button
                  width="50%"
                  colorScheme="green"
                  mr={3}
                  onClick={handleSubmitForm}
                >
                  Place Order
                </Button>
                <Button width="50%" colorScheme="red" onClick={onClose}>
                  Cancel Order
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Basket;
