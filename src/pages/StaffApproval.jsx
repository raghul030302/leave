import React, { useEffect, useState } from "react";
import "../css/staff.css";
import cql from "../images/cql.png";
import bell from "../images/bell.png";
import { FiLogOut, FiBell } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/MiniCalendar.css";
import {
  Text,
  Icon,
} from "@chakra-ui/react";
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Custom components
import Card from "../components/Card";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
// import MiniCalendar from "../components/MiniCalender";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ProfileBreating } from "../components/ProfileBreating";
import { StaffProfileCard } from "../components/StaffProfileCard";
import { AppliedToday } from "../components/AppliedToday";
import { Upcoming } from "../components/UpcomingLeave";
import { LeaveAppliednew } from "../components/LeaveAppliednew";
import { PopOver } from "../components/PopOver";


export const StaffApproval = (props) => {
    const { selectRange, ...rest } = props;
  const { id } = useParams();
  const [HOD, setHOD] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateState, setDateState] = useState(new Date());
  const [forward,setForward] = useState(false)

//   Change date event handler
const changeDate = (e) => {
    setDateState(e);
};

//   
useEffect(() => {
    // Get all the users from firebase firestore database
    const getUsers = async () => {
      setLoading(true);
      try {
        const ref = collection(db, "loginStaff");
        const userData = await getDocs(ref);
        const filterData = userData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserdata(filterData);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    // Get current user who is logged in
    const getCurrentUser = () => {
      setLoading(true);
      userdata.map((ele) => {
        if (ele.id === id) {
          setHOD(ele);
          setLoading(false);
        //   setForm({...form,studentName:ele.name})
        }
      });
    };
    getCurrentUser();
  },[userdata]);

  return (
    <>
      <div id="nav">
        <div id="navLogo">
          <img src={cql} alt="logo" />
        </div>
        <div id="navIcons">
          <PopOver/>
          <Link to={"/staff"}>
            <FiLogOut cursor={"pointer"} fontSize="25px"/>
          </Link>
        </div>
      </div>
      <div id="leaveMgmtStaff">
        <p>Leave Management</p>
        <div id="mgmtBtnStaff">
           <LeaveAppliednew/>
           <AppliedToday/>
           <Upcoming/>
        </div>
      </div>
      <div id="calenderContainer" >
        <div id="profile">
          {loading ? (
            <ProfileBreating />
          ) : (
            <StaffProfileCard
              image={HOD.image}
              name={HOD.name}
              dob={HOD.dob}
              advisor={HOD.advisor}
              id={id}
              branch={HOD.branch}
              email={HOD.email}
            />
          )}
        </div>
        <div className={forward ? "HODcalenderTrue" : "HODcalenderFalse"}>
          <Card align="center" direction="column" p="50px 15px" {...rest}>
            <Calendar
              onChange={changeDate}
              value={dateState}
              selectRange={selectRange}
              view={"month"}
              tileContent={<Text color="brand.500"></Text>}
              prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
              nextLabel={
                <Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />
              }
            />
            <p id="dateText">
              Current selected date is{" "}
              <b>{moment(dateState).format("MMMM Do YYYY")}</b>
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
