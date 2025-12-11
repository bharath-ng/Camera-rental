import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserType({ user, onChoose }) {
  const navigate = useNavigate();

  if(!user) {
    // if directly opened, go to login
    navigate("/");
    return null;
  }

  return (
    <div className="card">
      <h3>Hello, {user.name}</h3>
      <p>Which type of user are you?</p>
      <div className="row">
        <button className="btn" onClick={()=> onChoose("owner") }>I want to <strong>list</strong> my camera (Owner)</button>
        <button className="btn outline" onClick={()=> onChoose("renter") }>I want to <strong>rent</strong> a camera (Renter)</button>
      </div>
    </div>
  );
}
