import React from 'react'
import students from "../images/students.png"
import staff from "../images/staff.png"
import hod from "../images/hod.png"
import "../css/home.css"
import { Link } from 'react-router-dom'

const links = [
  {
    image:students,
    link:"/students",
    text:"STUDENTS"
  },
  {
    image:staff,
    link:"/staff",
    text:"STAFF"
  },
  {
    image:hod,
    link:"/hod",
    text:"HOD"
  }
]
export const Home = () => {
  return (
    <>
      <div id='homeContainer'>
        <div id='container'>
          {
            links.map((ele)=>(
               <Link to={ele.link}>
                  <div className='linkImages'>
                   <img src={ele.image} alt="" />
                    <h1>{ele.text}</h1>
                  </div>
               </Link>
            ))
          }
        </div>
      </div>
    </>
  )
}
