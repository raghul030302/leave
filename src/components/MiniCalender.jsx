import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/MiniCalendar.css";
import { Text, Icon } from "@chakra-ui/react";
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Custom components
import Card from "./Card";
import moment from 'moment'

export default function MiniCalendar(props) {
  const { selectRange, ...rest } = props;
  // const [value, onChange] = useState(new Date());
  const [dateState, setDateState] = useState(new Date())
  

  const changeDate = (e) => {
    setDateState(e)
  }
   

  console.log(moment(dateState).format('MMMM Do YYYY'))
  return (
    <Card
      align='center'
      direction='column'
      p='50px 15px'
      
      {...rest}>
      <Calendar
        onChange={changeDate}
        value={dateState}
        selectRange={selectRange}
        view={"month"}
        tileContent={<Text color='brand.500'></Text>}
        prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
        nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
      />
      <p id="dateText">Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
    </Card>
  );
}