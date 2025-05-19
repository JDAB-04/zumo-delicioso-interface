
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-50 to-yellow-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-gray-800">
              Calidad <span className="text-fruit-orange">directa</span> del <span className="text-fruit-green">Campo</span> a tu mesa
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg">
              Aquí podrás encontrar una amplia variedad de productos pensados para ti, 
              en <span className="text-fruit-green">Fruta </span> <span className="text-fruit-orange"> Fresca</span> estamos 
              comprometidos con la calidad y el buen servicio.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#productos" className="btn-primary text-lg px-8 py-3 rounded-lg">¡Productos en oferta!</a>
              <Link to="/encuentranos" className="btn-secondary text-lg px-8 py-3 rounded-lg">¿Dónde estamos?</Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-0">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-fruit-yellow/40 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-fruit-green/60 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="Frutas frescas variadas" 
                className="rounded-2xl shadow-lg animate-bounce-slow relative z-10 max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
