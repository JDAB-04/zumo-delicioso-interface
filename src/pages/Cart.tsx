
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Carrito</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.length > 0 ? (
              <div className="bg-white rounded-lg border p-6">
                <div className="divide-y">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-12 flex flex-col items-center justify-center text-center h-full">
                <h2 className="text-2xl font-medium text-gray-800 mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-600 mb-6">Añade algunos productos para poder realizar un pedido</p>
              </div>
            )}
          </div>
          
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
