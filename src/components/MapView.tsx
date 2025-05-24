// src/components/MapView.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { PSpinner } from '@porsche-design-system/components-react/ssr';

const DefaultIcon = L.icon({
  iconUrl: typeof iconUrl === 'string' ? iconUrl : iconUrl.src,
  shadowUrl: typeof iconShadow === 'string' ? iconShadow : iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

function SetViewToCurrentLocation({ setCoords, setLoading }: { setCoords: (c: [number, number]) => void, setLoading: (v: boolean) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setCoords(coords);
        map.setView(coords, 13);
        setLoading(false);
      },
      () => setLoading(false)
    );
  }, [map, setCoords, setLoading]);

  return null;
}

export default function MapView() {
  const [coords, setCoords] = useState<[number, number]>([-1.455, -48.489]); // fallback: Belém
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative h-screen w-full">
      {loading && (
        <div className="absolute inset-0 z-[999] flex items-center justify-center bg-white/80">
          <PSpinner size="large" />
        </div>
      )}

      <MapContainer
        center={coords}
        zoom={18}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={coords}>
          <Popup>Você está aqui</Popup>
        </Marker>
        <SetViewToCurrentLocation setCoords={setCoords} setLoading={setLoading} />
      </MapContainer>
    </div>
  );
}
