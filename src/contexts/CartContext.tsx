
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
  isOrganic: boolean;
  discount: number | null;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Cargar carrito desde localStorage al inicio
  useEffect(() => {
    const savedCart = localStorage.getItem('fruta-fresca-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, []);
  
  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('fruta-fresca-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart(prevCart => {
      // Verificar si el producto ya existe en el carrito
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Si existe, crear un nuevo array con la cantidad actualizada
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        toast.success(`${product.name} actualizado en el carrito`);
        return newCart;
      } else {
        // Si no existe, añadirlo al carrito
        toast.success(`${product.name} añadido al carrito`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === id);
      if (item) {
        toast.success(`${item.name} eliminado del carrito`);
      }
      return prevCart.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Carrito vaciado");
  };

  // Calcular el total del carrito
  const cartTotal = cart.reduce((total, item) => {
    const itemPrice = item.discount 
      ? item.price - (item.price * item.discount / 100) 
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  // Contar el número total de artículos en el carrito
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
