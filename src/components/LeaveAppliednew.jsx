import React, { useEffect, useState } from "react";
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

export const LeaveAppliednew = () => {
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
  const [forward, setForward] = useState(false);
  const [empty, setEmpty] = useState("");
  const [Leavedata, setLeaveData] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [lacHour, setLacHour] = useState([]);
  const [selected, setSelected] = useState("All");
  const [SelectedLeaveType, setSelectedLeaveType] = useState([]);

  // Get leave Data
  const getLeaveData = () => {
    const Leaveref = ref(database, "studentsLeaveForm/");
    // console.log(Leaveref)
    if(Leaveref===null){
      console.log("No leaves Found")
    }else{
      onValue(Leaveref, (snapshot) => {
        const data = snapshot.val();
        if (data === null || data === undefined) {
          setEmpty("No Leaves Found");
        } else {
          const newLeave = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setLeaveData(newLeave);
        }
      });
    }
   
  };

  //   Get selected Leave Data
  let arr = [];
  const getSelected = () => {
    Leavedata.map((ele) => {
      if (selected === "All") {
        setSelectedLeaveType(Leavedata);
      } else if (selected === ele.leaveType) {
        // console.log(ele)
        arr.push(ele);
        setSelectedLeaveType(arr);
      }
    });
  };

  useEffect(() => {
    getLeaveData();
    getSelected();
  }, [selected]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelectChange = (e) => {
    let select = e.target.value;
    setSelected(select);
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
        Leave Applied
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        {overlay}
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"30px"} textAlign="center" fontWeight={"bold"}>
              Leave Applied
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          {
            empty==="" ? <ModalBody>
            <div className="selectForward">
              <p id="forwardedLeave">Leave Type</p>
              <Select
                border={"2px solid black"}
                w="80%"
                onChange={handleSelectChange}
              >
                <option value="All">Select Leave type</option>
                <option value="Duty Leave">Duty Leave</option>
                <option value="Medical Leave">Medical Leave</option>
                <option value="Condonation">Condonation</option>
                <option value="Special Leave">Special Leave</option>
              </Select>
            </div>
            <Text
              marginLeft={"20px"}
              margin="20px"
              fontWeight={"bold"}
              color="red"
            >
              Selected : {selected}
            </Text>
            <div className={open ? "tableTrue" : "tableFalse"}>
              <Table>
                <Thead>
                  <Tr>
                    <Th fontSize={"17px"}>University No.</Th>
                    <Th fontSize={"17px"}>Name</Th>
                    <Th fontSize={"17px"}>View</Th>
                    <Th fontSize={"17px"}>Status</Th>
                  </Tr>
                </Thead>
                <p>{empty}</p>
                {selected === "All" ? (
                  <TableSelect
                    data={Leavedata}
                    handleOpen={handleOpen}
                    setData={setData}
                    setLacHour={setLacHour}
                  />
                ) : (
                  <TableSelect
                    data={SelectedLeaveType}
                    handleOpen={handleOpen}
                    setData={setData}
                    setLacHour={setLacHour}
                  />
                )}
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
                      {lacHour.map((ele) => {
                        return (
                          <div>
                            <p>Lacture :- {ele.lac}</p>
                            <p>Start At :- {ele.start}</p>
                            <p>End At :- {ele.end}</p>
                          </div>
                        );
                      })}
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
          
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
