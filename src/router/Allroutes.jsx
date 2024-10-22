import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { StudentLogin } from "../pages/StudentLogin";
// import {Calender} from "../pages/Calender"
import { LeaveForm } from "../pages/LeaveForm";
import RequiredAuth from "../APPContext/AppContext";
import { HodLogin } from "../pages/HodLogin";
import { HodApproval } from "../pages/HodApproval";
import { StaffLogin } from "../pages/StaffLogin";
import { StaffApproval } from "../pages/StaffApproval";

export const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<StudentLogin />} />
      <Route
        path="/calender/:id"
        element={<LeaveForm />}
      />
      <Route path="/hod" element={<HodLogin/>} /> 
      <Route path="/hodApprovals/:id" element={<HodApproval/>}/> 
      <Route path="/staff" element={<StaffLogin/>}/>
      <Route path="/staff/:id" element={<StaffApproval/>} />
    </Routes>
  );
};
