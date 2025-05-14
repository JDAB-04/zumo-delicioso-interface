
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const OrderSummary = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const handleCheckout = () => {
    // En una aplicación real, aquí iría la integración con pasarela de pago
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para realizar un pedido");
      return;
    }
    
    if (!user?.address) {
      toast.error("Debes añadir tu dirección en tu perfil para realizar un pedido");
      return;
    }
    
    // Simulación de envío de pedido
    setTimeout(() => {
      toast.success("¡Pedido realizado con éxito! Pronto recibirás tus productos");
      clearCart();
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-800">Tu carrito está vacío</h3>
        <p className="text-gray-600 mt-2">Parece que aún no has añadido productos a tu carrito</p>
        <Link to="/">
          <Button className="mt-4 bg-fruit-green hover:bg-fruit-green/90">
            Ir a comprar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Resumen del Pedido</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Productos ({cart.length})</span>
          <span>{cartTotal.toFixed(2)}€</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span>Gratis</span>
        </div>
        
        <div className="border-t pt-3 mt-3 flex justify-between">
          <span className="font-medium text-base">Total</span>
          <span className="font-medium text-lg">{cartTotal.toFixed(2)}€</span>
        </div>
      </div>
      
      {isAuthenticated ? (
        <div className="mb-6 p-3 bg-green-50 rounded-md">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-fruit-green" />
            <span className="text-sm">Entregar a: <strong>{user?.name}</strong></span>
          </div>
          {user?.address ? (
            <p className="text-xs text-gray-600 mt-1 ml-6">{user.address}</p>
          ) : (
            <p className="text-xs text-fruit-red mt-1 ml-6">
              ¡Añade tu dirección en tu perfil para completar el pedido!
            </p>
          )}
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-md text-center">
          <p className="text-sm mb-2">Inicia sesión para completar tu compra</p>
          <Link to="/auth">
            <Button variant="outline" size="sm" className="w-full">
              Iniciar sesión
            </Button>
          </Link>
        </div>
      )}
      
      <Button 
        className="w-full bg-fruit-green hover:bg-fruit-green/90 mb-2"
        onClick={handleCheckout}
        disabled={!isAuthenticated || !user?.address}
      >
        Realizar Pedido
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={clearCart}
      >
        Vaciar carrito
      </Button>
    </div>
  );
};

export default OrderSummary;
