import React from 'react'

export const HodProfileCard = (prop) => {
    const {image,name,dob,id,branch,email,advisor} = prop
  return (
    <div id='profileContainer'>
    <div id="profilePic">
            <img src={image} alt="profilepic" />
          </div>
          <p>Name : {name}</p>
          <p>HOD ID : {id}</p>
          <p>DOB : {dob} </p>
          <p>Advisor : {advisor}</p>
          <p>Branch : {branch}</p>
          <p>Email : {email}</p>
    </div>
  )
}