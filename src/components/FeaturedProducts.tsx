
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { allProducts } from "@/data/products";

// Mostramos solo 4 productos en la sección de destacados
const featuredProducts = allProducts.slice(0, 4);

const FeaturedProducts = () => {
  return (
    <section id="productos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Productos Destacados</h2>
        <p className="section-subtitle">
          Descubre nuestra selección de frutas frescas y de temporada
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/productos">
            <Button variant="outline" className="text-fruit-green border-fruit-green hover:bg-fruit-green hover:text-white">
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
