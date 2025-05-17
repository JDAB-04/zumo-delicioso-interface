
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-fruit-green text-2xl font-bold mr-1">Fruta</span>
            <span className="text-fruit-orange text-2xl font-bold">Fresca</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-fruit-green transition-colors">Inicio</Link>
          <Link to="/productos" className="text-gray-700 hover:text-fruit-green transition-colors">Productos</Link>
          <a href="#categorias" className="text-gray-700 hover:text-fruit-green transition-colors">Categorías</a>
          <a href="#nosotros" className="text-gray-700 hover:text-fruit-green transition-colors">Nosotros</a>
          <a href="#contacto" className="text-gray-700 hover:text-fruit-green transition-colors">Contacto</a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-fruit-red hover:bg-fruit-red px-1.5 py-px min-h-0 min-w-6 flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Hola, {user?.name.split(' ')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">Mi perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cart" className="cursor-pointer">Mi carrito</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-500">
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button className="bg-fruit-green hover:bg-fruit-green/90">
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-fruit-red hover:bg-fruit-red px-1.5 py-px min-h-0 min-w-6 flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-md">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Inicio</Link>
            <Link to="/productos" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Productos</Link>
            <a href="#categorias" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Categorías</a>
            <a href="#nosotros" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Nosotros</a>
            <a href="#contacto" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Contacto</a>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 py-2 hover:text-fruit-green transition-colors flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Mi Perfil
                </Link>
                <Button onClick={() => logout()} variant="ghost" className="justify-start px-0 text-red-500 hover:text-red-600 hover:bg-transparent">
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button className="bg-fruit-green hover:bg-fruit-green/90 w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
