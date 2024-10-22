import React from 'react'

export const StaffProfileCard = (prop) => {
    const {image,name,id,dob,advisor,branch,email} = prop
  return (
    <div id='profileContainer'>
        <div id="profilePic">
            <img src={image} alt="profilepic" />
        </div>
          <p>Name : {name}</p>
          <p>Staff ID : {id}</p>
          <p>DOB : {dob} </p>
          <p>Advisor : {advisor}</p>
          <p>Branch : {branch}</p>
          <p>Email : {email}</p>
    </div>
  )
}
