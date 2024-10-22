import React, { useEffect, useState } from "react";
import "../css/studentlogin.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import collegelogo from "../images/collegeLogo.png";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  Text
} from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { db } from "../config/firebase";
// import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";


export const StudentLogin = () => {
  const [users, setUser] = useState([]);
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = useState("");
  const [id, setid] = useState("");
  const [pass, setPwd] = useState("");
  const [msg, setMsg] = useState(false);
  const [err, setErr] = useState(false);
  const [link, setlink] = useState(false);
  const navigate = useNavigate();

  const ref = collection(db, "login");
  // console.log(ref)
  const handleClick = () => setShow(!show);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await getDocs(ref);
        const filterData = userData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUser(filterData);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  // console.log(users);
  const handleLogin = () => {
    if (users.find((user) => username === user.username && pass === user.pwd)) {
      setMsg(true);
      setlink(true);
    } else {
      setErr(true);
      setlink(false);
    }

    users.map((ele) => {
      if (username === ele.username && pass === ele.pwd) {
        setid(ele.id);
      }
    });
    //  console.log(id)
    if (link) {
      navigate(`/calender/${id}`);
    } else {
      navigate("/students");
    }
  };

  return (
    <div id="LoginPage">
      <div id="backIcon">
        <Link to={"/"}>
          <IoArrowBackCircleOutline cursor={"pointer"} color="black" />
        </Link>
        <p id="Dash">Student Dashboard</p>
      </div>
      <div id="msg">
        {msg ? (
          <div className={msg ? "alertMsg" : "alertErr"}>
            <Alert status="success">
              <AlertIcon />
              Login Successful welcome {username}
            </Alert>
          </div>
        ) : (
          <div className={err ? "errmsg" : "errFalse"}>
            <Alert status="error">
              <AlertIcon />
              Invalid Username or Password
            </Alert>
          </div>
        )}
      </div>
      <div id="loginBox">
        <img src={collegelogo} alt="" />
        <div className="form">
          <Input
            backgroundColor={"white"}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            required
          />
          <InputGroup size="md">
            <Input
              backgroundColor={"white"}
              name="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <InputRightElement width="4.5rem">
              <Button
                size="sm"
                onClick={handleClick}
                variant="ghost"
                fontSize={"20px"}
              >
                {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* <Input type={"submit"} placeholder="Login" className="loginBtn" backgroundColor={"yellow"} /> */}
          <Button
            colorScheme={"yellow"}
            size="sm"
            onClick={handleLogin}
            fontSize="16px"
            className="loginBtn"
          >
            Login
          </Button>
          <Text color={"white"} textAlign="center">Double Click To Login</Text>
        </div>
      </div>
    </div>
  );
};
