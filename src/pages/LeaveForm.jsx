import React, { useEffect, useState } from "react";
import "../css/leaveform.css";
import cql from "../images/cql.png";
import { FiLogOut, FiBell } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/MiniCalendar.css";
import {
  Text,
  Icon,
  Input,
  Select,
  Checkbox,
  Button,
  Stack,
  Box,
  Tooltip,
} from "@chakra-ui/react";
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Custom components
import Card from "../components/Card";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
// import MiniCalendar from "../components/MiniCalender";
import { db } from "../config/firebase";
import { collection, getDocs,} from "firebase/firestore";
import { PopUp } from "../components/PopUp";
import { ProfileBreating } from "../components/ProfileBreating";
import { ProfileCard } from "../components/ProfileCard";
import { Time } from "../components/Time";
import { storage } from "../config/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import { PopOver } from "../components/PopOver";


export const LeaveForm = (props) => {
  const { selectRange, ...rest } = props;
  const { id } = useParams();
  const [users, setUser] = useState([]);
  const [userName, setName] = useState("");
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateState, setDateState] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setFile] = useState(null);
  const [startTime,setStartTime] = useState("")
  const [checked, setChecked] = useState(Boolean);
  const [checkitem,setCheckedItem] = useState(Boolean)
  const [lacturetime, setLacTime] = useState(false);
  const [lacture, setLacture] = useState([]);
  const [form, setForm] = useState({
    studentName:"",
    studentId:id,
    leaveDay: "",
    date:"",
    appliedOn:dateState.getDate(),
    reason: "",
    desc: "",
    leaveType: "",
    uploadedFile: "",
    lactureHours:lacture,
    leaveId:Math.floor(Math.random() * Date.now())
  });
  
 
  // Display dates from calender on change
  const changeDate = (e) => {
    setForm({...form,leaveDay:moment(e).format("MMMM Do YYYY")})
    setDateState(e)
    onOpen()
  };
 
  // Geting the day
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[dateState.getDay()];

  // Get all users from the data
  const getUsers = async () => {
    try {
      const ref = collection(db, "login");
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

  // Get current user who is logged in
  const getCurrentUser = () => {
    userdata.map((ele) => {
      setLoading(true)
      if (ele.id === id) {
        setUser(ele);
        setName(ele.name)
      }
      setLoading(false)
    });
    
  };
  // console.log(form.studentName)
  // const setFormDataName = (name,value) => {
  //   return setForm({...form,[name]:value})
  // }
  const setFormDate = () =>{
    setForm({...form,date:dateState.getDate()})
  }

  // Get notification of current user
  
  useEffect(() => {
    getUsers();
    getCurrentUser();
    // setForm({...form,[studentName]:userName})
    setFormDate()
  }, [userdata]);

  useEffect(()=>{
    setForm({...form,studentName:userName})
  },[userName])

// console.log(form.studentName)
 
// console.log(form.studentName,form.studentId,form.date)
  // checkbox event
  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  // handle upload File
  const handleUpload = () => {
    if (selectedFile === null) return;
    const imageRef = ref(storage, `leave_Files/${selectedFile.name + v4()}`);
    uploadBytes(imageRef, selectedFile)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setForm({ ...form, uploadedFile: downloadURL });
        alert("File Uploaded Successfully");
      });
    toast.success("Uploading....");
  };


  const getFormData = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    setForm({ ...form, [name]: value });
    // setForm({ ...form, studentName: value });
  };
  
  //const handle lactures
  const handleLac = (ele) => {
    lacture.push(ele)
    setLacTime(true)
  };
  const removeLac = (ele,i) => {
    lacture.splice(ele,i)
  }
  // console.log(lacture)
  // Post leave application data on server
  const postData = async (e) => {
    const {
      studentName,
      studentId,
      leaveDay,
      date,
      appliedOn,
      reason,
      desc,
      leaveType,
      uploadedFile,
      lactureHours,
      leaveId
    } = form;
    try {
      await fetch(
        `https://cdlmini-6a742-default-rtdb.firebaseio.com/studentsLeaveForm.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentName,
            studentId,
            leaveDay,
            date,
            appliedOn,
            reason,
            desc,
            leaveType,
            uploadedFile,
            lactureHours,
            leaveId
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div id="nav">
        <div id="navLogo">
          <img src={cql} alt="logo" />
        </div>
        <div id="navIcons">
          <PopOver userid={id}/>
          <Tooltip label="Log out">
            <Link to={"/students"}>
              <FiLogOut cursor={"pointer"} fontSize="25"/>
            </Link>
          </Tooltip>
        </div>
      </div>
      <div id="calenderContainer">
        <div id="profile">
          {loading ? (
            <ProfileBreating />
          ) : (
            <ProfileCard
              image={users.image}
              name={users.name}
              dob={users.dob}
              id={id}
              branch={users.branch}
              email={users.email}
              loading={loading}
            />
          )}
        </div>
        <div id="calender">
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
      <div className="leaveForm">
        {/* Drawer imported from chakra ui */}
        <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader
              fontSize={"40px"}
              textAlign="center"
            >{`APPLY LEAVE`}
            </DrawerHeader>
            <DrawerBody>
              <Stack direction={"column"} gap="10px">
                <Box display={"grid"} gap="20px">
                  <Time
                    day={day}
                    date={moment(dateState).format("MMMM Do YYYY")}
                    handleLac={handleLac}
                    removeLac={removeLac}
                  />
                </Box>
                <p onChange={getFormData} value={form.Date}>
                  Leave Application for{" "}
                  <b>{moment(dateState).format("MMMM Do YYYY")}</b>
                </p>
                <div className={lacturetime ? "lacTrue" : "lacFalse"}>
                  Selected Lacture and time : {
                    lacture.map((ele)=>{
                      return <div>
                        <p> Lacture :{ele.lac}</p>
                        <p>Start at : {ele.start}</p>
                        <p>End at : {ele.end}</p>
                        </div>
                    })
                  }
                  {/* {lacture.lac} Start At:{" "}
                  {lacture.start} End At: {lacture.end} */}
                </div>
                <p>
                  Name : {users.name}
                </p>
                <p>
                  University No. : {id}
                </p>
                
                <div>
                  <p>Leave Reason</p>
                  <Input
                    type={"text"}
                    name="reason"
                    value={form.reason}
                    onChange={getFormData}
                    color="black"
                    border={"2px solid black"}
                  />
                </div>
                {/* <Input name="studentName" value={userName} onChange={getFormData}/> */}
                <div>
                  <p>Leave Description</p>
                  <Input
                    type={"text"}
                    name="desc"
                    value={form.desc}
                    color="black"
                    border={"2px solid black"}
                    height="100px"
                    onChange={getFormData}
                  />
                </div>
                <div>
                  <p>Leave Type</p>
                  <Select
                    name="leaveType"
                    border={"2px solid black"}
                    value={form.leaveType}
                    onChange={getFormData}
                  >
                    <option value="">Select Leave type</option>
                    <option value="Duty Leave">Duty Leave</option>
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="Condonation">Condonation</option>
                    <option value="Special Leave">Special Leave</option>
                  </Select>
                </div>
                <div>
                  <p>Upload File</p>
                  <div id="uploadBox">
                    <input type="file" onChange={getFormData} />
                    <Button colorScheme="blue" onClick={handleUpload}>
                      Upload
                    </Button>
                  </div>
                </div>
                <Checkbox
                  size="lg"
                  colorScheme="orange"
                  marginTop={"20px"}
                  isChecked={checked}
                  onChange={handleCheckbox}
                >
                  Agree to send all the information regarding leave to faculty,
                  advisor, and HOD.
                </Checkbox>
                <PopUp
                  name={userName}
                  leaveReason={form.reason}
                  checked={checked}
                  postData={postData}
                  onclose={onClose}
                />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};
