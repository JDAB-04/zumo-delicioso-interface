
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const NavItem = ({ to, children, currentPath }: { to: string; children: React.ReactNode; currentPath: string }) => (
  <li className="block">
    <Link
      to={to}
      className={`text-gray-700 hover:text-fruit-green py-2 px-3 rounded-md text-sm font-medium transition-colors ${
        currentPath === to ? "text-fruit-green bg-green-50" : ""
      }`}
    >
      {children}
    </Link>
  </li>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Cierra el menú cuando se cambia de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-fruit-green text-xl font-bold mr-1">Fruta</span>
            <span className="text-fruit-orange text-xl font-bold">Fresca</span>
          </Link>

          {/* Enlaces de navegación para desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-1">
              <NavItem to="/" currentPath={location.pathname}>
                Inicio
              </NavItem>
              <NavItem to="/productos" currentPath={location.pathname}>
                Productos
              </NavItem>
              <NavItem to="/encuentranos" currentPath={location.pathname}>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Encuéntranos</span>
                </div>
              </NavItem>
            </ul>
          </div>

          {/* Botones de acción para desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/cart">
              <Button
                variant="ghost"
                className="relative text-gray-700 hover:text-fruit-green"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-fruit-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-fruit-green"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-fruit-red border-fruit-red hover:bg-fruit-red hover:text-white"
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button
                  variant="outline"
                  className="text-fruit-green border-fruit-green hover:bg-fruit-green hover:text-white"
                >
                  Ingresar
                </Button>
              </Link>
            )}
          </div>

          {/* Botón de menú hamburguesa para móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-fruit-green focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden py-2 space-y-2 transition-all duration-300`}
        >
          <ul className="space-y-2 pb-3 border-b">
            <NavItem to="/" currentPath={location.pathname}>
              Inicio
            </NavItem>
            <NavItem to="/productos" currentPath={location.pathname}>
              Productos
            </NavItem>
            <NavItem to="/encuentranos" currentPath={location.pathname}>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Encuéntranos</span>
              </div>
            </NavItem>
          </ul>
          
          {/* Botones de acción para móvil */}
          <div className="pt-2 flex flex-col space-y-2">
            <Link to="/cart" className="flex items-center justify-between">
              <span className="flex items-center text-gray-700 hover:text-fruit-green">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>Carrito</span>
              </span>
              {totalItems > 0 && (
                <span className="bg-fruit-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700 hover:text-fruit-green"
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>Mi Perfil</span>
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="w-full text-fruit-red border-fruit-red hover:bg-fruit-red hover:text-white"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Link to="/auth" className="w-full">
                <Button
                  variant="outline"
                  className="w-full text-fruit-green border-fruit-green hover:bg-fruit-green hover:text-white"
                >
                  Ingresar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
