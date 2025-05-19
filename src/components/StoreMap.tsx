
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

// Define las coordenadas de la tienda (ejemplo: Bogotá)
const storeLocation = {
  lat: 4.6097,
  lng: -74.0817
};

// Estilos para el contenedor del mapa
const containerStyle = {
  width: '100%',
  height: '400px'
};

// Opciones del mapa
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: true,
  fullscreenControl: true,
};

interface StoreMapProps {
  apiKey: string;
}

const StoreMap = ({ apiKey }: StoreMapProps) => {
  const [showInfoWindow, setShowInfoWindow] = useState(true);

  return (
    <div className="w-full">
      {apiKey ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={storeLocation}
            zoom={15}
            options={mapOptions}
          >
            <Marker 
              position={storeLocation}
              onClick={() => setShowInfoWindow(!showInfoWindow)}
              icon={{
                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#4CAF50" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
                ),
                scaledSize: new window.google.maps.Size(36, 36),
                anchor: new window.google.maps.Point(18, 36),
              }}
            >
              {showInfoWindow && (
                <InfoWindow onCloseClick={() => setShowInfoWindow(false)}>
                  <div className="p-2">
                    <h3 className="font-bold text-fruit-green">Fruta Fresca</h3>
                    <p className="text-sm">Calle 170 #35-23, Bogotá, Colombia</p>
                    <p className="text-sm">Tel: +57 313 441 98 25</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          </GoogleMap>
        </LoadScript>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-100 rounded-lg">
          <MapPin className="w-12 h-12 text-fruit-green mb-4" />
          <p className="text-lg font-medium">Cargando mapa...</p>
          <p className="text-sm text-gray-500">
            Si el mapa no carga, por favor ingresa tu API Key de Google Maps.
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreMap;
