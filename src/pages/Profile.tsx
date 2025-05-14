
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Profile = () => {
  const { user, isAuthenticated, logout, updateUserProfile } = useAuth();
  
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, address, phone });
    setEditing(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mi Cuenta</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </Button>
              <Link to="/cart">
                <Button className="bg-fruit-orange hover:bg-fruit-orange/90">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Ver mi carrito
                </Button>
              </Link>
            </div>
          </div>
          
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-fruit-green rounded-full p-3 mr-4">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              
              <Button 
                variant={editing ? "outline" : "default"} 
                className={!editing ? "bg-fruit-green hover:bg-fruit-green/90" : ""}
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancelar" : "Editar perfil"}
              </Button>
            </div>
            
            {editing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <Label htmlFor="profile-name">Nombre</Label>
                  <Input 
                    id="profile-name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="profile-address">Dirección de entrega</Label>
                  <Input 
                    id="profile-address"
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Tu dirección completa"
                  />
                </div>
                
                <div>
                  <Label htmlFor="profile-phone">Teléfono</Label>
                  <Input 
                    id="profile-phone"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="Tu número de teléfono"
                  />
                </div>
                
                <Button type="submit" className="bg-fruit-green hover:bg-fruit-green/90">
                  Guardar cambios
                </Button>
              </form>
            ) : (
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Dirección de entrega</h3>
                  <p className="text-gray-800">{user?.address || "No has añadido una dirección"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                  <p className="text-gray-800">{user?.phone || "No has añadido un teléfono"}</p>
                </div>
              </div>
            )}
          </Card>
          
          {/* Aquí se podrían mostrar pedidos anteriores en una implementación real */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-xl font-medium text-gray-800 mb-2">Historial de Pedidos</h3>
            <p className="text-gray-600">Todavía no tienes ningún pedido.</p>
            <Link to="/">
              <Button className="mt-4 bg-fruit-green hover:bg-fruit-green/90">
                Empezar a comprar
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
