import React from "react";

/*
 Presentational card for each camera.
 Images expect an array of image paths like /images/camera1.jpg (served from public/images).
 */

export default function CameraCard({ camera }) {
  return (
    <div className="camera-card">
      <div className="thumb">
        <img src={camera.images && camera.images[0] ? camera.images[0] : "/images/camera1.jpg"} alt={camera.title} />
      </div>
      <div className="info">
        <h4>{camera.title}</h4>
        <p><strong>Owner:</strong> {camera.ownerName} ({camera.ownerType})</p>
        <p><strong>Lens:</strong> {camera.lensDescription}</p>
        <p><strong>Price/day:</strong> ₹{camera.pricePerDay}</p>
        <p><strong>Location:</strong> {camera.location}</p>
        <p><strong>Contact:</strong> {camera.contact}</p>
      </div>
    </div>
  );
}
