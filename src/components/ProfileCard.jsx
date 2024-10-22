import React from 'react'
import { Skeleton } from '@chakra-ui/react'
export const ProfileCard = (prop) => {
    const {image,name,dob,id,branch,email,loading} = prop
    
  return (
    <div id='profileContainer'>
          <div id="profilePic">
            {
              loading ? <Skeleton height='200px'/> :<img src={image} alt="profilepic" />
            }
            
          </div>
          <p>Name : {name}</p>
          <p>University No: {id}</p>
          <p>DOB : {dob} </p>
          <p>Branch : {branch}</p>
          <p>Email : {email}</p>
    </div>
  )
}
