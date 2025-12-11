import React, { useState } from "react";

/*
 Simple login form that asks Name and Phone + optional Location.
 After submit we call onLogin({name, phone, location}) and move forward.
 */

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  function submit(e){
    e.preventDefault();
    if(!name || !phone){ alert("Please enter name and phone"); return; }
    onLogin({ name, phone, location: location || "" });
  }

  return (
    <div className="card login-card">
      <h2>Welcome to CameraRent</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
        <label>Phone</label>
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+91-9XXXXXXXXX" />
        <label>Location (city)</label>
        <input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="e.g., Bangalore" />
        <button type="submit" className="btn">Continue</button>
      </form>
    </div>
  );
}
