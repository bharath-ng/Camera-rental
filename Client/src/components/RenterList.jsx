import React, { useEffect, useState } from "react";
import axios from "axios";
import CameraCard from "./CameraCard";

/*
 Shows cameras filtered by user.location (if provided).
 If no location, shows all cameras but allows search by city.
 */

export default function RenterList({ user }) {
  const [cameras, setCameras] = useState([]);
  const [city, setCity] = useState(user?.location || "");
  const [loading, setLoading] = useState(false);

  async function fetchList(cityFilter="") {
    setLoading(true);
    try {
      const url = cityFilter ? `https://camera-rental-4ung.onrender.com/cameras?location=${encodeURIComponent(cityFilter)}` : "http://localhost:5000/cameras";
      const res = await axios.get(url);
      setCameras(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Could not fetch cameras. Make sure json-server is running.");
    } finally { setLoading(false); }
  }

  useEffect(()=>{ fetchList(city); }, []);

  return (
    <div>
      <div className="card">
        <h3>Find cameras near you</h3>
        <div className="row">
          <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter city e.g., Bangalore" />
          <button className="btn" onClick={()=>fetchList(city)}>Search</button>
        </div>
      </div>

      {loading && <div className="card">Loading...</div>}

      <div className="grid">
        {cameras.length === 0 && !loading && <div className="card">No cameras found in this locality.</div>}
        {cameras.map(cam => <CameraCard key={cam.id} camera={cam} />)}
      </div>
    </div>
  );
}
