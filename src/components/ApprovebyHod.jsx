import React, { useState } from "react";
import { Button, Tbody, Td, Tr } from "@chakra-ui/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { BsFillXCircleFill } from "react-icons/bs";
import { ref,remove} from "firebase/database"

import { database, db } from "../config/firebase";

export const ApprovebyHod = (prop) => {
  const { data, handleOpen, setData, currentDate } = prop;

  const removeLeaveHod = (id) => {
    const dbRef = ref(database,`forwardLeaveToHod/${id}`)
    remove(dbRef).then(()=>{
      console.log("Removed"+id)
    }).catch((err)=>{
      console.log(err)
    })
 }
  const handleForward = async (ele) => {
    try {
      await fetch(
        `https://cdlmini-6a742-default-rtdb.firebaseio.com/approvedByHod.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ele),
        }
      );
      alert("Approved Leave successfully");
    } catch (err) {
      console.log(err);
    }
  };
  // const addFeedback = (id) => {
  //   const dbRef = ref(database, `studentsLeaveForm/${id}`);
  // };

  const handleRejected = async (ele) => {
    try {
      await fetch(
        `https://cdlmini-6a742-default-rtdb.firebaseio.com/rejectedLeavebyHod.json`,
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
            notification: `Congratulations ${ele.studentName} Your Leave application with Leave id ${ele.id} approved by HOD`,
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
            notification: `Sorry ${ele.studentName} Your leave application with Leave id ${ele.id} Rejected by HOD`,
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
        {data.map((ele,i) => (
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
            <Button
              variant={"ghost"}
              onClick={() => {
                handleForward(ele);
                StudentNotificationForward(ele);
                removeLeaveHod(ele.id);
              }}
            >
              <IoCheckmarkCircleSharp fontSize={"30px"} color="green" />
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => {
                handleRejected(ele);
                StudentNotificationRejected(ele);
                removeLeaveHod(ele.id);
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
