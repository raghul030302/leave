import React, { useEffect, useState } from "react";
import { Button, Tbody, Td, Tr } from "@chakra-ui/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { BsFillXCircleFill } from "react-icons/bs";
import { ref, remove, set } from "firebase/database";

import { database, db } from "../config/firebase";
// import { async } from "@firebase/util";

export const TableSelect = (prop) => {
  const { data, handleOpen, setData, currentDate, setLacHour } = prop;
  // const [note,setNote] = useState("")

  const removeLeave = (id) => {
    const dbRef = ref(database, `studentsLeaveForm/${id}`);
    remove(dbRef).then(() => {
      // alert("Forwarded successfully to Faculty")
      console.log("Removed Student id-"+id)
    });
  };

  //  handle Forward LEaves
  const handleForward = async (ele) => {
    try {
      await fetch(
        `https://cdlmini-6a742-default-rtdb.firebaseio.com/forwardLeaveToHod.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appledOn:ele.appledOn,
            date:ele.date,
            desc:ele.desc,
            leaveDay:ele.leaveDay,
            leaveType:ele.leaveType,
            reason:ele.reason,
            studentId:ele.studentId,
            studentName:ele.studentName,
            uploadedFile:ele.uploadedFile
          }),
        }
      );
      alert("Forwarded successfully to HOD");
    } catch (err) {
      console.log(err);
    }
  };
  // const addFeedback = (id) => {
  //   const dbRef = ref(database, `studentsLeaveForm/${id}`);
  // };
  // handle Rejected
  const handleRejected = async (ele) => {
    try {
      await fetch(
        `https://cdlmini-6a742-default-rtdb.firebaseio.com/rejectedLeave.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ele),
        }
      );
      alert("Rejected successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const StudentNotificationForward = async (ele) => {
    try {
      await fetch(
        `https://cdlmini-6a742-default-rtdb.firebaseio.com/studentsNotification.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: ele.studentId,
            notification: `Congratulations ${ele.studentName} Your Leave application with Leave id ${ele.id} Forwarded to HOD`,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const StudentNotificationRejected = async (ele) => {
    try {
      await fetch(
        `https://cdlmini-6a742-default-rtdb.firebaseio.com/studentsNotification.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: ele.studentId,
            notification: `Sorry ${ele.studentName} Your leave application with Leaveid ${ele.id} Rejected`,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Tbody fontSize={"18px"}>
        {data.map((ele) => (
          <Tr key={ele.id}>
            <Td>{ele.studentId}</Td>
            <Td>{ele.studentName}</Td>
            <Td
              onClick={() => {
                handleOpen();
                setData(ele);
                setLacHour(ele.lactureHours);
              }}
              color={"blue"}
              cursor="pointer"
            >
              open
            </Td>
            <Button
              variant={"ghost"}
              onClick={() => {
                handleForward(ele);
                StudentNotificationForward(ele);
                removeLeave(ele.id);
              }}
            >
              <IoCheckmarkCircleSharp fontSize={"30px"} color="green" />
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                handleRejected(ele);
                StudentNotificationRejected(ele);
                removeLeave(ele.id);
              }}
            >
              <BsFillXCircleFill fontSize={"25px"} color="red" />
            </Button>
          </Tr>
        ))}
      </Tbody>
    </>
  );
};
