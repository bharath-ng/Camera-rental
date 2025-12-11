import React, { useState } from "react";
import { addCamera } from "../api";
import { useNavigate } from "react-router-dom";

export default function CameraForm() {
  const navigate = useNavigate();
  const initialLocation = sessionStorage.getItem("camera_user_location") || "";
  const initialOwnerType = "individual"; // owner form sets ownerType via select
  const [form, setForm] = useState({
    ownerType: initialOwnerType,
    ownerName: "",
    title: "",
    lensDescription: "",
    pricePerDay: "",
    location: initialLocation,
    contact: "",
    images: ["/images/camera1.jpg"]
  });

  const [imageInput, setImageInput] = useState(""); // url input for images

  const handle = (k, v) => setForm({ ...form, [k]: v });

  const addImageUrl = () => {
    const url = imageInput.trim();
    if (!url) return;
    handle("images", [...form.images, url]);
    setImageInput("");
  };

  const removeImageAt = (index) => {
    const copy = [...form.images];
    copy.splice(index, 1);
    handle("images", copy);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.contact) return alert("Please add title and contact");
    const payload = { ...form, pricePerDay: Number(form.pricePerDay || 0) };
    try {
      const saved = await addCamera(payload);
      alert("Camera added with id " + saved.id);
      navigate("/list");
    } catch (err) {
      console.error(err);
      alert("Failed to add camera. Make sure json-server is running on port 5000.");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 760, margin: "20px auto", padding: 16, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>Add Camera for Rent (Owner)</h2>

      <label style={{ display: "block", marginTop: 8 }}>Owner Type</label>
      <select value={form.ownerType} onChange={(e) => handle("ownerType", e.target.value)} style={{ width: "100%", padding: 8 }}>
        <option value="individual">Individual</option>
        <option value="studio">Studio</option>
      </select>

      <label style={{ display: "block", marginTop: 8 }}>Owner Name</label>
      <input value={form.ownerName} onChange={(e) => handle("ownerName", e.target.value)} style={{ width: "100%", padding: 8 }} required />

      <label style={{ display: "block", marginTop: 8 }}>Camera Title</label>
      <input value={form.title} onChange={(e) => handle("title", e.target.value)} style={{ width: "100%", padding: 8 }} required />

      <label style={{ display: "block", marginTop: 8 }}>Lens Description</label>
      <textarea value={form.lensDescription} onChange={(e) => handle("lensDescription", e.target.value)} style={{ width: "100%", padding: 8 }} />

      <label style={{ display: "block", marginTop: 8 }}>Price Per Day (INR)</label>
      <input type="number" value={form.pricePerDay} onChange={(e) => handle("pricePerDay", e.target.value)} style={{ width: "100%", padding: 8 }} />

      <label style={{ display: "block", marginTop: 8 }}>Location (city)</label>
      <input value={form.location} onChange={(e) => handle("location", e.target.value)} style={{ width: "100%", padding: 8 }} required />

      <label style={{ display: "block", marginTop: 8 }}>Contact Info</label>
      <input value={form.contact} onChange={(e) => handle("contact", e.target.value)} style={{ width: "100%", padding: 8 }} required />

      <div style={{ marginTop: 8 }}>
        <label>Add image URL (or use local path like /images/camera1.jpg)</label>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <input value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="/images/camera1.jpg or https://..." style={{ flex: 1, padding: 8 }} />
          <button type="button" onClick={addImageUrl} style={{ padding: "8px 12px" }}>Add Image</button>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {form.images.map((img, idx) => (
            <div key={idx} style={{ width: 120, textAlign: "center" }}>
              <img src={img} alt={`preview-${idx}`} style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }} onError={(e)=>{ e.currentTarget.src = "/images/camera1.jpg"; }} />
              <div style={{ marginTop: 6 }}>
                <button type="button" onClick={() => removeImageAt(idx)} style={{ fontSize: 12 }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button type="submit" style={{ padding: "8px 16px" }}>Submit</button>
      </div>
    </form>
  );
}
