
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Frutas de Temporada",
    image: "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    count: 24,
  },
  {
    id: 2,
    name: "Frutos Secos",
    image: "https://images.unsplash.com/photo-1563520208326-338f9c0ea2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    count: 18,
  },
  {
    id: 3,
    name: "Frutas Tropicales",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    count: 16,
  },
  {
    id: 4,
    name: "Frutas Orgánicas",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    count: 32,
  },
];

const Categories = () => {
  return (
    <section id="categorias" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Nuestras Categorías</h2>
        <p className="section-subtitle">
          Explora nuestra amplia selección de frutas clasificadas para tu comodidad
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {categories.map((category) => (
            <Link 
            to={`/productos?categoria=${encodeURIComponent(category.name)}`} 
            key={category.id}
          >
            <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium text-lg">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} productos</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
};

export default Categories;