import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const PopUp = (prop) => {
  const { name, date, leaveReason, checked, postData, onclose } = prop;

  const Overlay = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        ml={4}
        w={"30%"}
        margin="auto"
        color={"white"}
        colorScheme="blue"
        isDisabled={checked ? false : true}
        onClick={() => {
          
          postData();
          onOpen();
        }}
      >
        Apply
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {Overlay}
        <ModalContent>
          <ModalHeader>Leave Applied for Date {date}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{name}</Text>
            <Text>{leaveReason}</Text>
            <Text>Leave Applied Successfully thank you!</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose() 
                onclose()
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
