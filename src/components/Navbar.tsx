
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-fruit-green text-2xl font-bold mr-1">Fruta</span>
            <span className="text-fruit-orange text-2xl font-bold">Fresca</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-fruit-green transition-colors">Inicio</a>
          <a href="#productos" className="text-gray-700 hover:text-fruit-green transition-colors">Productos</a>
          <a href="#categorias" className="text-gray-700 hover:text-fruit-green transition-colors">Categorías</a>
          <a href="#nosotros" className="text-gray-700 hover:text-fruit-green transition-colors">Nosotros</a>
          <a href="#contacto" className="text-gray-700 hover:text-fruit-green transition-colors">Contacto</a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button className="bg-fruit-green hover:bg-fruit-green/90">Comprar</Button>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-md">
          <div className="flex flex-col space-y-3">
            <a href="#" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Inicio</a>
            <a href="#productos" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Productos</a>
            <a href="#categorias" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Categorías</a>
            <a href="#nosotros" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Nosotros</a>
            <a href="#contacto" className="text-gray-700 py-2 hover:text-fruit-green transition-colors">Contacto</a>
            <div className="flex items-center space-x-4 py-2">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button className="bg-fruit-green hover:bg-fruit-green/90">Comprar</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
