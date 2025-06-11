// 'use client';

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useEffect } from 'react';

// // Fix marker icon issue in Leaflet + Next.js
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// });

// interface SurveyMapProps {
//   mapColor?: string;
// }

// const position: [number, number] = [51.505, -0.09];

// export default function SurveyMap({ mapColor = '#000000' }: SurveyMapProps) {
//   useEffect(() => {
//     // Ensure Leaflet map renders correctly in Next.js
//     if (typeof window !== 'undefined') {
//       import('leaflet').then(() => {
//         const mapElements = document.getElementsByClassName('leaflet-container');
//         if (mapElements.length > 0) {
//           (mapElements[0] as HTMLElement).style.filter = mapColor === '#808080' ? 'grayscale(100%)' : 'none';
//         }
//       });
//     }
//   }, [mapColor]);

//   return (
//     <MapContainer
//       center={position}
//       zoom={13}
//       scrollWheelZoom={false}
//       style={{ height: '300px', width: '100%' }}
//     >
//       <TileLayer
//         attribution='© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
//         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//       />
//       <Marker position={position}>
//         <Popup>Default Marker Position</Popup>
//       </Marker>
//     </MapContainer>
//   );
// }