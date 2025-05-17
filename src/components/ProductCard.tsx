
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
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

export default ProductCard;
