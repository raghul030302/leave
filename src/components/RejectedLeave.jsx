import React from "react";
import { useEffect, useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import { ref, onValue, get } from "firebase/database";
import { database } from "../config/firebase";
import { FcOpenedFolder } from "react-icons/fc";
import { TableSelect } from "./TableSelect";
import moment from "moment";

export const RejectedLeave = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [rejectedData, setRejected] = useState([]);
  const [empty,setEmpty] = useState("")
  const [open, setOpen] = useState([]);
  const [data, setData] = useState([]);

  // Get leave Data
  const getLeaveData = () => {
    const Leaveref = ref(database, "rejectedLeave/");
    onValue(Leaveref, (snapshot) => {
      const data = snapshot.val();
      if(data===null){
        setEmpty("No Rejected Leaves Found")
      }else{
        const newLeave = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRejected(newLeave);
      }
    });
  };
 useEffect(()=>{
   getLeaveData()
 })
  // handle Open
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button
        // ml='4'
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
          setOpen(false);
        }}
      >
        Rejected Leave
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        {overlay}
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"30px"} textAlign="center" fontWeight={"bold"}>
                Rejected Leaves
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          {
            empty==="" ? <ModalBody>
            {/* <Text marginLeft={"20px"} margin="20px" fontWeight={"bold"} color="red">Selected : {selected}</Text> */}
            <div className={open ? "tableTrue" : "tableFalse"}>
              <Table variant={"striped"}>
                <Thead>
                  <Tr>
                    <Th fontSize={"17px"}>University No.</Th>
                    <Th fontSize={"17px"}>Name</Th>
                    <Th fontSize={"17px"}>View</Th>
                    <Th fontSize={"17px"}>Feedback</Th>
                  </Tr>
                </Thead>
                <Tbody fontSize={"18px"}>
                  {rejectedData.map((ele) => (
                    <Tr key={ele.id}>
                      <Td>{ele.studentId}</Td>
                      <Td>{ele.studentName}</Td>
                      <Td
                        onClick={() => {
                          handleOpen();
                          setData(ele);
                        }}
                        color={"blue"}
                        cursor="pointer"
                      >
                        open
                      </Td>
                      <Td>

                      </Td>
                    </Tr>
                  ))}
                </Tbody>
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
                    <a id="leaveLinktag" href={data.uploadedFile}>
                      File
                      <FcOpenedFolder fontSize={"60px"} />
                    </a>
                  </div>
                </div>
              }
            </div>
          </ModalBody> : <Text color={"red"} fontSize={"20px"}>{empty}</Text>
          }
          
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
