import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: null,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0,
  incrementCartItem: () => {},
  decrementCartItem: () => {},
  removeCartItem: () => {},
  cartTotal: 0,
});

const updateCartItems = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => productToAdd.id === cartItem.id
  );

  if (existingItem) {
    return increment(cartItems, productToAdd);
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const increment = (cartItems, productToAdd) => {
  return cartItems.map((cartItem) => {
    return cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem;
  });
};

const decrement = (cartItems, productToMinus) => {
  return cartItems.map((cartItem) => {
    return cartItem.id === productToMinus.id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1 > 1 ? cartItem.quantity - 1 : 1,
        }
      : cartItem;
  });
};

const remove = (cartItems, productToRemove) => {
  // const index = cartItems.findIndex(({ id }) => productToRemove.id === id);

  // return cartItems.toSpliced(index, 1);

  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

const calculateTotal = (cartItems) =>
  cartItems.reduce((total, { quantity, price }) => total + quantity * price, 0);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(updateCartItems(cartItems, productToAdd));
  };

  const incrementCartItem = (cartProduct) => {
    addItemToCart(cartProduct);
  };
  const decrementCartItem = (cartProduct) => {
    setCartItems(decrement(cartItems, cartProduct));
  };
  const removeCartItem = (cartProduct) => {
    setCartItems(remove(cartItems, cartProduct));
  };

  useEffect(() => {
    setCartItemCount(
      cartItems.reduce((total, { quantity }) => total + quantity, 0)
    );

    setCartTotal(calculateTotal(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartItemCount,
        incrementCartItem,
        decrementCartItem,
        removeCartItem,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
