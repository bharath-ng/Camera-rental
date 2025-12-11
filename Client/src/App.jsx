import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import UserType from "./components/UserType";
import OwnerForm from "./components/OwnerForm";
import RenterList from "./components/RenterList";

/*
 App-level state holds current user info (name, phone, location).
 After login we route to user type selection. Depending on choice we show OwnerForm or RenterList.
*/

export default function App() {
  const [user, setUser] = useState(null); // { name, phone, location }
  const navigate = useNavigate();

  return (
    <div className="app-bg">
      <Routes>
        <Route path="/" element={<Login onLogin={(u)=>{ setUser(u); navigate("/type"); }} />} />
        <Route path="/type" element={<UserType user={user} onChoose={(type)=> {
          if(type === "owner") navigate("/owner");
          else navigate("/renter");
        }} />} />
        <Route path="/owner" element={<OwnerForm user={user} />} />
        <Route path="/renter" element={<RenterList user={user} />} />
      </Routes>
    </div>
  );
}
