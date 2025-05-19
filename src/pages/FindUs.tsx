
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreMap from '@/components/StoreMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

const FindUs = () => {
  // En un entorno real, esta clave debería venir de variables de entorno
  // Para esto, usaremos un estado local que el usuario puede establecer
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState<boolean>(true);

  const handleSubmitKey = (e: React.FormEvent) => {
    e.preventDefault();
    setShowKeyInput(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-green-50 to-yellow-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 text-center">
              <span className="text-fruit-green">Encuéntranos</span> fácilmente
            </h1>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
              Visítanos en nuestra tienda principal para encontrar todas nuestras frutas frescas y productos orgánicos. ¡Te esperamos!
            </p>
          </div>
        </section>

        {/* Mapa section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="section-title">Nuestra Ubicación</h2>
            <p className="section-subtitle">
              Visítanos en nuestra tienda principal y disfruta de nuestros productos frescos.
            </p>
            
            {showKeyInput && (
              <div className="max-w-md mx-auto mb-8 p-4 border rounded-lg bg-gray-50">
                <form onSubmit={handleSubmitKey} className="flex flex-col gap-2">
                  <label htmlFor="apiKey" className="text-sm font-medium">
                    Para mostrar el mapa, ingresa tu API Key de Google Maps:
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      id="apiKey"
                      type="text" 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Ingresa tu Google Maps API Key" 
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-fruit-green hover:bg-fruit-green/90">
                      Aplicar
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Puedes obtener una API Key en la <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-fruit-green underline">Google Cloud Console</a>
                  </p>
                </form>
              </div>
            )}
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <StoreMap apiKey={apiKey} />
            </div>

            {/* Información de contacto */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-fruit-green/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-fruit-green" />
                  </div>
                  <h3 className="font-bold text-xl">Dirección</h3>
                </div>
                <p className="text-gray-600">Calle 170 #35-23</p>
                <p className="text-gray-600">Bogotá, Colombia</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-fruit-orange/10 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-fruit-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl">Teléfono</h3>
                </div>
                <p className="text-gray-600">+57 313 441 98 25</p>
                <p className="text-gray-600">Lun - Sáb: 8am a 10pm</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-fruit-green/10 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-fruit-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl">Email</h3>
                </div>
                <p className="text-gray-600">clientes@frutafresca.com.co</p>
                <p className="text-gray-600">Respuesta en 24 horas</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FindUs;
