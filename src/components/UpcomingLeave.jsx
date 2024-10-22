import React, { useState,useEffect } from "react";
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
  Tr,
} from "@chakra-ui/react";

import { ref, onValue, get } from "firebase/database";
import { database } from "../config/firebase";
import { TableSelect } from "./TableSelect";
import { FcOpenedFolder } from "react-icons/fc";

export const Upcoming = () => {
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
  const [upcoming,setUpcoming] = useState([])
  const [Leavedata, setLeaveData] = useState([]);
  const [empty,setEmpty] = useState("")
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [text,setText] = useState("")
  const [lacHour,setLacHour] = useState([]) 

  let today = new Date().getDate();
  // console.log(day);
  const getUpcomingLeaves = () => {
    let arr = []
      Leavedata.map((ele)=>{
        if(today < ele.date){
          arr.push(ele)
        }else{
          setText("No Leaves")
        }
      })
     setUpcoming(arr)
  }
  // console.log(upcoming)
  useEffect(() => {
    const Leaveref = ref(database, "studentsLeaveForm");
    onValue(Leaveref, (snapshot) => {
      const data = snapshot.val();
      if(data===null){
        setEmpty("No upcoming leaves found")
      }else{
        const newLeave = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // console.log(newLeave);
        setLeaveData(newLeave);
      }
      getUpcomingLeaves()
    });
  }, [upcoming]);
  const handleOpen = () => {
    setOpen(!open);
  };
  // console.log(Leavedata)
  return (
    <>
      <Button
        // ml='4'
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
          setOpen(false)
        }}
      >
        Upcoming Leave
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        {overlay}
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"30px"} textAlign="center" fontWeight={"bold"}>
              Upcoming
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          {
            empty==="" ? <ModalBody>
            <div className={open ? "tableTrue" : "tableFalse"}>
                <Table  variant="striped">
                  <Thead>
                    <Tr>
                      <Th fontSize={"17px"}>University No.</Th>
                      <Th fontSize={"17px"}>Name</Th>
                      <Th fontSize={"17px"}>View</Th>
                      <Th fontSize={"17px"}>Status</Th>
                    </Tr>
                  </Thead>
  
                  {
                    upcoming===[] ? <><th>No leaves applied for</th></> : <TableSelect
                    data={upcoming}
                    handleOpen={handleOpen}
                    setData={setData}
                    currentDate={today}
                    setLacHour={setLacHour}
                  />
                  }
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
                      <p id="leaveHeading">LEAVE HOUR</p>
                      <p id="leavePtag">
                      {
                        lacHour.map((ele)=>{
                          return <div>
                                <p>Lacture :- {ele.lac}</p>
                               <p>Start At :- {ele.start}</p>
                               <p>End At :- {ele.end}</p>
                            </div>
                        })
                       }
                      </p>
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
