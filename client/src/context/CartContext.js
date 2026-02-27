'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, isLoaded: authLoaded } = useAuth();

  const cartKey = user ? `zelp_cart_${user.id || user.phone}` : 'zelp_cart_guest';

  // Load cart from localStorage on mount
  useEffect(() => {
    if (!authLoaded) return;

    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
        setCart([]);
      }
    } else {
        setCart([]);
    }
    setIsLoaded(true);
  }, [cartKey, authLoaded]);

  // Save cart to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (isLoaded) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, cartKey, isLoaded]);

  const addToCart = (item) => {
    setCart((prev) => {
      // Check if item already exists
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => 
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true); // Open cart when adding item
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateCartItem = (index, newItem) => {
    setCart((prev) => {
        const next = [...prev];
        next[index] = newItem;
        return next;
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === itemId) {
          const newQty = (item.quantity || 1) + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const cartMrpTotal = cart.reduce((total, item) => total + ((item.mrp || item.price) * (item.quantity || 1)), 0);
  const cartDiscount = cartMrpTotal - cartTotal;
  const cartCount = cart.reduce((count, item) => count + (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      updateCartItem,
      clearCart, 
      isCartOpen, 
      setIsCartOpen,
      cartTotal,
      cartMrpTotal,
      cartDiscount,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
