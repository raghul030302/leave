import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../config/firebase";
import {FcOpenedFolder} from "react-icons/fc";
import "../css/leaveApplied.css";
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
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { ApprovebyHod } from "./ApprovebyHod";

export const ForwardLeaves = () => {
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const [Leavedata, setLeaveData] = useState([]);
  const [empty,setEmpty] = useState("")
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const Leaveref = ref(database, `forwardLeaveToHod`);
    onValue(Leaveref, (snapshot) => {
      const data = snapshot.val();
      if(data===null){
       setEmpty("Forwarded Leaves not found")
      }else{
        const newLeave = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // console.log(newLeave);
        setLeaveData(newLeave);
      }
    });
  }, [Leavedata]);

  const handleOpen = () => {
    setOpen(!open);
  };
  
  
  return (
    <>
      <Button
        // ml='4'
        onClick={() => {
          <OverlayTwo />;
          onOpen();
          setOpen(false);
        }}
      >
        Forward Leave
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        {overlay}
        <ModalContent>
          <ModalHeader fontSize={"30px"} textAlign="center" fontWeight={"bold"}>
            Forward Leave
          </ModalHeader>
          <ModalCloseButton />
          {
            empty === "" ? <ModalBody>
            <div className={open ? "tableTrue" : "tableFalse"}>
              <Table variant='striped' colorScheme='telegram'>
                <Thead>
                  <Tr>
                    <Th fontSize={"17px"}>University No.</Th>
                    <Th fontSize={"17px"}>Name</Th>
                    <Th fontSize={"17px"}>View</Th>
                    <Th fontSize={"17px"}>Approve</Th>
                  </Tr>
                </Thead>
                <ApprovebyHod data={Leavedata} setData={setData} handleOpen={handleOpen}/>
              </Table>
            </div>
            <div className={open ? "detailsTrue" : "detailsFalse"}>
              {
                <div key={data.id} id="leaveDetails">
                  <div id="dataElement">
                    <p id="leaveHeading">LEAVE TYPE </p>
                    <p id="leavePtag">{data.leaveType}</p>
                  </div>
                  <div id="dataElement">
                    <p id="leaveHeading">LEAVE ON</p>
                    <p id="leavePtag">{data.leaveDay}</p>
                  </div>
                  <div id="dataElement">
                    <p id="leaveHeading">REASON</p>
                    <p id="leavePtag">{data.reason}</p>
                  </div>
                  <div id="dataElement">
                    <p id="leaveHeading">DESCRIPTION </p>
                    <p id="leavePtag">{data.desc}</p>
                  </div>
                  <div id="dataElement">
                    <p id="leaveHeading">ATTACHMENT</p>
                    <a id="leaveLinktag" href={data.uploadedFile}>File<FcOpenedFolder fontSize={"60px"}/></a>
                  </div>
                </div>
              }
            </div>
          </ModalBody> : <Text textAlign={"center"} fontSize={"25px"} fontWeight={"bold"} color={"red"}>{empty}</Text>
          }
          
          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
