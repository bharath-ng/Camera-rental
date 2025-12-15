import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function OwnerForm({ user }) {
  const [ownerType, setOwnerType] = useState("individual");
  const [ownerName, setOwnerName] = useState(user?.name || "");
  const [title, setTitle] = useState("");
  const [lensDescription, setLensDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [location, setLocation] = useState(user?.location || "");
  const [contact, setContact] = useState(user?.phone || "");
  const [images, setImages] = useState(""); // comma-separated URLs for demo
    const navigate = useNavigate();
  async function submit(e){
    e.preventDefault();
    const payload = {
      ownerType, ownerName, title, lensDescription,
      pricePerDay: Number(pricePerDay),
      location, contact,
      images: images.split(",").map(s=>s.trim()).filter(Boolean)
    };
    try {
      await axios.post("https://camera-rental-4ung.onrender.com/cameras", payload);
      alert("Camera listed successfully!");
      // clear
      setTitle(""); setLensDescription(""); setPricePerDay(""); setImages("");
      navigate("/type");
    } catch (err) {
      console.error(err);
      alert("Failed to save — make sure json-server is running (npm run server).");
    }
  }

  return (
    <div className="card">
      <h3>List Your Camera</h3>
      <form onSubmit={submit}>
        <label>Owner Type</label>
        <select value={ownerType} onChange={(e)=>setOwnerType(e.target.value)}>
          <option value="individual">Individual</option>
          <option value="studio">Studio</option>
        </select>

        <label>Owner Name</label>
        <input value={ownerName} onChange={(e)=>setOwnerName(e.target.value)} />

        <label>Camera Title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Canon EOS ..." />

        <label>Lens Description</label>
        <textarea value={lensDescription} onChange={(e)=>setLensDescription(e.target.value)} />

        <label>Price per day (INR)</label>
        <input type="number" value={pricePerDay} onChange={(e)=>setPricePerDay(e.target.value)} />

        <label>Location (city)</label>
        <input value={location} onChange={(e)=>setLocation(e.target.value)} />

        <label>Contact</label>
        <input value={contact} onChange={(e)=>setContact(e.target.value)} />

        <label>Images (comma-separated URLs, e.g. /images/camera1.jpg)</label>
        <input value={images} onChange={(e)=>setImages(e.target.value)} placeholder="/images/camera1.jpg, /images/lens1.jpg" />

        <button className="btn" type="submit">Submit & Publish</button>
      </form>
    </div>
  );
}
