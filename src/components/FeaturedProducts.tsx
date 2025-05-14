
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const products = [
  {
    id: 1,
    name: "Manzanas Orgánicas",
    price: 2.99,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isOrganic: true,
    discount: null,
  },
  {
    id: 2,
    name: "Plátanos Premium",
    price: 1.99,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isOrganic: true,
    discount: 10,
  },
  {
    id: 3,
    name: "Naranjas Dulces",
    price: 3.49,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isOrganic: false,
    discount: null,
  },
  {
    id: 4,
    name: "Fresas Frescas",
    price: 4.99,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isOrganic: true,
    discount: 15,
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const { addToCart } = useCart();
  
  const discountedPrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : null;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105" 
        />
        {product.isOrganic && (
          <Badge className="absolute top-2 left-2 bg-fruit-green">Orgánico</Badge>
        )}
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-fruit-red">-{product.discount}%</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {discountedPrice ? (
              <>
                <span className="text-fruit-red font-bold">{discountedPrice}€/{product.unit}</span>
                <span className="text-gray-500 line-through text-sm">{product.price}€</span>
              </>
            ) : (
              <span className="text-gray-800 font-bold">{product.price}€/{product.unit}</span>
            )}
          </div>
        </div>
        <Button 
          className="w-full bg-fruit-green hover:bg-fruit-green/90"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </CardContent>
    </Card>
  );
};

const FeaturedProducts = () => {
  return (
    <section id="productos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Productos Destacados</h2>
        <p className="section-subtitle">
          Descubre nuestra selección de frutas frescas y de temporada
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" className="text-fruit-green border-fruit-green hover:bg-fruit-green hover:text-white">
            Ver Todos los Productos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
