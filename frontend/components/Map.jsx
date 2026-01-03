// components/Map.jsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

// Fix for missing marker icons
// components/Map.jsx

const carIcon = L.divIcon({
  className: "custom-nav-icon",
  html: `
    <div style="display:flex; justify-content:center; align-items:center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" stroke="white" stroke-width="2" width="34" height="34">
        <path d="M12 2L4.5 20.29C4.21 21.01 4.96 21.72 5.67 21.39L12 18.5L18.33 21.39C19.04 21.72 19.79 21.01 19.5 20.29L12 2Z" />
      </svg>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

// --- NEW COMPONENT: This forces the map to move ---
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    // flyTo creates a smooth animation to the new spot
    map.flyTo(position, map.getZoom()); 
  }, [position, map]);
  return null;
}

export default function Map() {
  // Coordinates for Rourkela (Lat, Lng)
  const [position, setPosition] = useState([22.2613, 84.8536]);
  
  // NOTE: In your data, 22.x is Latitude and 84.x is Longitude.
  // I kept your keys 'long'/'lat' but treated them as [lat, lng] to match your logic.
const simData = [
    // Starting near Sector 1 / Ring Road Junction
    { long: 22.2605, lat: 84.8532 }, 
    { long: 22.2608, lat: 84.8534 },
    { long: 22.2612, lat: 84.8536 },
    { long: 22.2616, lat: 84.8539 },
    
    // Moving up the main road
    { long: 22.2621, lat: 84.8542 },
    { long: 22.2626, lat: 84.8545 },
    { long: 22.2631, lat: 84.8548 },
    { long: 22.2636, lat: 84.8551 },
    
    // Slight curve in the road
    { long: 22.2642, lat: 84.8555 },
    { long: 22.2648, lat: 84.8559 },
    { long: 22.2654, lat: 84.8564 },
    
    // Continuing straight
    { long: 22.2660, lat: 84.8569 },
    { long: 22.2666, lat: 84.8574 },
    { long: 22.2672, lat: 84.8579 },
    { long: 22.2678, lat: 84.8584 },
    
    // Approaching next junction
    { long: 22.2684, lat: 84.8590 },
    { long: 22.2690, lat: 84.8595 },
    { long: 22.2696, lat: 84.8600 },
    { long: 22.2702, lat: 84.8606 },
    { long: 22.2708, lat: 84.8612 }
  ];

  const startSimulation = () => {
    simData.forEach((data, index) => {
      // THE FIX: Multiply index by time (e.g., 0s, 2s, 4s, 6s)
      setTimeout(() => {
        setPosition([data.long, data.lat]);
      }, index * 1000); // Moves every 2 seconds
    });
  };

  return (
    <div className="flex flex-col h-screen w-full">
         
      <div className="p-4 bg-white shadow-md z-10 relative">
        <button 
            onClick={startSimulation}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Start Simulation
        </button>
      </div>

      {/* Map Container needs explicit height to show up */}
      <div className="flex-1 w-full relative"> 
        <MapContainer
          center={position}
          zoom={25} // Zoomed in closer to see movement
          style={{ height: "100%", width: "100%" }}
        >
          {/* This component handles the camera movement */}
          <RecenterMap position={position} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position} icon={carIcon}>
            <Popup>
              Truck #101 <br /> Status: Moving
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}