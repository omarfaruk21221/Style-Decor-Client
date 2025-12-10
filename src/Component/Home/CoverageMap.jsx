import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet with React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LOCATIONS = [
    { id: 1, name: "Dhaka HQ", position: [23.8103, 90.4125], type: "Headquarters" },
    { id: 2, name: "Chittagong Branch", position: [22.3569, 91.7832], type: "Branch" },
    { id: 3, name: "Sylhet Hub", position: [24.8949, 91.8687], type: "Hub" },
];

const CoverageMap = () => {
    return (
        <section className="py-24 bg-base-200/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Service Coverage</h2>
                    <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
                        We are currently operating in major cities across the country. Find us near you.
                    </p>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 h-[500px] relative z-0">
                    <MapContainer
                        center={[23.8103, 90.4125]}
                        zoom={7}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {LOCATIONS.map((loc) => (
                            <React.Fragment key={loc.id}>
                                <Marker position={loc.position}>
                                    <Popup>
                                        <div className="text-center">
                                            <h3 className="font-bold text-lg">{loc.name}</h3>
                                            <p className="text-sm">{loc.type}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                                <Circle
                                    center={loc.position}
                                    pathOptions={{ fillColor: 'blue', color: 'blue' }}
                                    radius={30000}
                                />
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};

export default CoverageMap;
