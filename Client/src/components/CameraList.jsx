import React, { useEffect, useState } from "react";
import { getCameras } from "../api";
import CameraCard from "./CameraCard";

export default function CameraList() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoc, setFilterLoc] = useState(sessionStorage.getItem("camera_user_location") || "");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCameras({ location: filterLoc })
      .then((data) => {
        if (!mounted) return;
        setCameras(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setCameras([]);
        setLoading(false);
      });
    return () => (mounted = false);
  }, [filterLoc]);

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto" }}>
      <div style={{ marginBottom: 12 }}>
        <label>Filter by city</label>
        <input value={filterLoc} onChange={(e) => setFilterLoc(e.target.value)} style={{ marginLeft: 8, padding: 8 }} />
      </div>

      {loading ? (
        <div style={{ padding: 16, background: "#fff", borderRadius: 8 }}>Loading...</div>
      ) : cameras.length ? (
        <div style={{ display: "grid", gap: 12 }}>
          {cameras.map((c) => (
            <CameraCard key={c.id} camera={c} />
          ))}
        </div>
      ) : (
        <div style={{ padding: 16, background: "#fff", borderRadius: 8 }}>No cameras found in this locality.</div>
      )}
    </div>
  );
}
