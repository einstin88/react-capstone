import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0,
});

const updateCartItems = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => productToAdd.id === cartItem.id
  );

  if (existingItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(updateCartItems(cartItems, productToAdd));
  };

  useEffect(() => {
    setCartItemCount(
      cartItems.reduce((total, { quantity }) => total + quantity, 0)
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
