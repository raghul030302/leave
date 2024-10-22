import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../config/firebase";
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
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { BsFillXCircleFill } from "react-icons/bs";
import moment from "moment";
import { FcOpenedFolder } from "react-icons/fc";
import { TableSelect } from "./TableSelect";

export const AppliedToday = () => {
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
  const [Leavedata, setLeaveData] = useState([]);
  const [TodayDate, setDate] = useState(new Date());
  const [empty, setEmpty] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [lacHour, setLacHour] = useState([]);

  // const weekday = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  let today = new Date().getDate();
  const getTodayLeaves = () => {
    let arr = [];
    Leavedata.map((ele) => {
      if (today === ele.appliedOn) {
        arr.push(ele);
      } else {
        setText("No Leaves");
      }
    });
    setTodayData(arr);
    setLoading(false);
  };
  useEffect(() => {
    const Leaveref = ref(database, "studentsLeaveForm");
    onValue(Leaveref, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setEmpty("No leaves found");
      } else {
        const newLeave = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLeaveData(newLeave);
      }
    });
    getTodayLeaves();
  }, [todayData]);

  const handleOpen = () => {
    setOpen(!open);
  };
  // const handleForward = (ele) => {};
  // const handleRejected = (ele) => {};

  // const removeLeave = (ele) => {};

  // console.log(Leavedata);
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
        Applied Today
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        {overlay}
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"30px"} textAlign="center" fontWeight={"bold"}>
              Applied Today
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          {empty === "" ? (
            <ModalBody>
              <div className={open ? "tableTrue" : "tableFalse"}>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th fontSize={"17px"}>University No.</Th>
                      <Th fontSize={"17px"}>Name</Th>
                      <Th fontSize={"17px"}>View</Th>
                      <Th fontSize={"17px"}>Status</Th>
                    </Tr>
                  </Thead>

                  {todayData === [] ? (
                    <>
                      <th>No leaves applied for</th>
                    </>
                  ) : (
                    <TableSelect
                      data={todayData}
                      handleOpen={handleOpen}
                      setData={setData}
                      currentDate={today}
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
            </ModalBody>
          ) : (
            <Text textAlign={"center"} fontSize={"25px"} fontWeight={"bold"} color={"red"}>
              {empty}
            </Text>
          )}

          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
