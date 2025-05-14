
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const CartItem = ({ item, updateQuantity, removeFromCart }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
    }
  };
  
  const handleBlur = () => {
    updateQuantity(item.id, quantity);
  };
  
  // Calcular precio con descuento si aplica
  const itemPrice = item.discount 
    ? (item.price - (item.price * item.discount / 100)).toFixed(2) 
    : item.price.toFixed(2);
    
  const totalPrice = (parseFloat(itemPrice) * item.quantity).toFixed(2);

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
        <div className="flex text-sm text-gray-600">
          {item.isOrganic && (
            <span className="mr-2 px-2 bg-fruit-green/10 text-fruit-green rounded-full text-xs">Orgánico</span>
          )}
          <span>{item.price}€/{item.unit}</span>
          {item.discount && (
            <span className="ml-2 text-fruit-red">{item.discount}% dto.</span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-20">
          <Input
            type="number"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            className="h-9"
          />
        </div>
        <div className="w-20 text-right font-medium">{totalPrice}€</div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:text-fruit-red hover:bg-red-50"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
