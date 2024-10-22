import React, { useEffect, useState } from "react";
import "../css/time.css";
import { Table, Thead, Button, Text, Checkbox } from "@chakra-ui/react";

const hoursArr = [
  {
    hour: "Hour 1",
    start: "09:00",
    end: "09:50",
  },
  {
    hour: "Hour 2",
    start: "09:50",
    end: "10:40",
  },
  {
    hour: "Hour 3",
    start: "10:50",
    end: "11:40",
  },
  {
    hour: "Hour 4",
    start: "11:40",
    end: "12:30",
  },
  {
    hour: "Hour 5",
    start: "13:30",
    end: "14:20",
  },
  {
    hour: "Hour 6",
    start: "14:20",
    end: "15:10",
  },
  {
    hour: "Hour 7",
    start: "15:20",
    end: "16:10",
  },
];
const monday = [
  {
    lac: "Remedial",
    start: "09:00",
    end: "09:50",
  },
  {
    lac: "Algorithm",
    start: "09:50",
    end: "10:40",
  },
  {
    lac: "Data Analytics",
    start: "10:50",
    end: "11:40",
  },
  {
    lac: "Computer Graphics",
    start: "11:40",
    end: "12:30",
  },
  {
    lac: "Compiler Design",
    start: "13:30",
    end: "14:20",
  },
  {
    lac: "Department Hour",
    start: "14:20",
    end: "15:10",
  },
  {
    lac: "Computer Graphics",
    start: "15:20",
    end: "16:10",
  },
];
const tuesday = [
  {
    lac: "Industrial Economics",
    start: "09:00",
    end: "09:50",
  },
  {
    lac: "Placement",
    start: "09:50",
    end: "10:40",
  },
  {
    lac: "Data Analytics",
    start: "10:50",
    end: "11:40",
  },
  {
    lac: "Computer Graphics",
    start: "11:40",
    end: "12:30",
  },
  {
    lac: "Compiler Design",
    start: "13:30",
    end: "14:20",
  },
  {
    lac: "Algorithm",
    start: "14:20",
    end: "15:10",
  },
  {
    lac: "Industrial Economics",
    start: "15:20",
    end: "16:10",
  },
];
const wed = [
  {
    lac: "Remedial",
    start: "09:00",
    end: "09:50",
  },
  {
    lac: "Data Analytics",
    start: "09:50",
    end: "10:40",
  },
  {
    lac: "Computer Graphics",
    start: "10:50",
    end: "11:40",
  },
  {
    lac: "Algorithm",
    start: "11:40",
    end: "12:30",
  },
  {
    lac: "Lab",
    start: "13:30",
    end: "14:20",
  },
  {
    lac: "Lab",
    start: "14:20",
    end: "15:10",
  },
  {
    lac: "Lab",
    start: "15:20",
    end: "16:10",
  },
];
const thursday = [
  {
    lac: "Compiler Design",
    start: "09:00",
    end: "09:50",
  },
  {
    lac: "Computer Graphics",
    start: "09:50",
    end: "10:40",
  },
  {
    lac: "Comprehensive Work",
    start: "10:50",
    end: "11:40",
  },
  {
    lac: "Compiler Design",
    start: "11:40",
    end: "12:30",
  },
  {
    lac: "Data Analytics",
    start: "13:30",
    end: "14:20",
  },
  {
    lac: "Algorithm",
    start: "14:20",
    end: "15:10",
  },
  {
    lac: "Industrial Economics",
    start: "15:20",
    end: "16:10",
  },
];
const friday = [
  {
    lac: "Lab",
    start: "09:00",
    end: "09:50",
  },
  {
    lac: "Lab",
    start: "09:50",
    end: "10:40",
  },
  {
    lac: "Lab",
    start: "10:50",
    end: "11:40",
  },
  {
    lac: "Remedial",
    start: "11:40",
    end: "12:30",
  },
  {
    lac: "Algorithm",
    start: "13:30",
    end: "14:20",
  },
  {
    lac: "Compiler Design",
    start: "14:20",
    end: "15:10",
  },
  {
    lac: "Computer Graphics",
    start: "15:20",
    end: "16:10",
  },
];

export const Time = (prop) => {
  const { day, date, handleLac,handlecheck,isChecked,array} = prop;
  const [currentDay, setCurrentDay] = useState([]);
  const [text, setText] = useState("");
 


  useEffect(() => {
    if (day === "Monday") {
      setCurrentDay(monday);
    } else if (day === "Tuesday") {
      setCurrentDay(tuesday);
    } else if (day === "Wednesday") {
      setCurrentDay(wed);
    } else if (day === "Thursday") {
      setCurrentDay(thursday);
    } else if (day === "Friday") {
      setCurrentDay(friday);
    } else if (day === "Saturday") {
      setText("No Lactures on Saturday");
    } else if (day === "Sunday") {
      setText("No Lactures on Sunday");
    }
  }, []);
  
  // const handleLac = (ele) => {
  //     setLacture(ele)
  // }
  // console.log(lacture)

  return (
    <>
      <div className="sceduleContainer">
        <Table>
          <Thead>
            <tr>
              <th>Days/Hours</th>
              {hoursArr.map((ele) => (
                <th>
                  <div id="hourContainer">
                    <p>{ele.hour}</p>
                    <div id="startEndContainer">
                      <p>Start {ele.start}</p>
                      <p>End {ele.end}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </Thead>
        </Table>
      </div>
      <div className="sceduleContainer2">
        {/* <Table>
          <Thead>
            <th>
              {day} {date}
            </th>
            {currentDay === [] ? (
              <th>
                <p id="noLac">No Lacture on {day}</p>
              </th>
            ) : (
              currentDay.map((ele) => (
                <th>
                  <div id="hourContainerLac" variant={"ghost"} onClick={()=>{handleLac(ele)}}>
                    <p>{ele.lac}</p>
                    <div id="startEndContainer">
                      <p>Start {ele.start}</p>
                      <p>End {ele.end}</p>
                    </div>
                  </div>
                </th>
              ))
            )}
          </Thead>
        </Table> */}
        <div id="dayContainer">
          <Text fontWeight={"bold"} fontSize="20px">
            {day} {date}
          </Text>
        </div>
        <div id="checkboxDiv">
          {currentDay === [] ? (
            <p>{text}</p>
          ) : (
            currentDay.map((ele, index) => {
              return (
                <div id="checkBoxContainer">
                  <Checkbox
                    fontWeight={"bold"}
                    colorScheme="red"
                    onChange={() => {
                      handleLac(ele);
                    }}
                  >
                    {ele.lac} {ele.start} to {ele.end}
                  </Checkbox>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
