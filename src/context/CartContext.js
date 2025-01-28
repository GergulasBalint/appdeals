import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingProduct = prevCart.find(item => item.id === product.absolute_href);
      
      if (existingProduct) {
        // If exists, increase quantity
        return prevCart.map(item =>
          item.id === product.absolute_href
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // If doesn't exist, add new product with quantity 1
      return [...prevCart, { ...product, id: product.absolute_href, quantity: 1 }];
    });

    // Optional: Add a visual feedback
    alert('Product added to cart!');
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: cart.reduce((total, item) => total + (parseFloat(item.font_medium?.replace('$', '')) || 0) * item.quantity, 0)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 