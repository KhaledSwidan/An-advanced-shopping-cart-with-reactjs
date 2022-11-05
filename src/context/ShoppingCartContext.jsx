import React, { createContext, useContext, useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';

export const ShoppingCartContext = createContext({});

const initialCartItems = localStorage.getItem("shopping-cart") ? JSON.parse(localStorage.getItem("shopping-cart")) : [];

export const ShoppingCartProvider = ({ children }) =>
{
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const [cartItems, setCartItems] = useState(initialCartItems);
  const getItemsQuantity = id => cartItems.find(e => e.id === id)?.quantity || 0;
  const increaseCartQuantity = id => setCartItems(
    currItems =>
    {
      if (currItems.find(item => item.id === id) == null)
        return [...currItems, { id, quantity: 1 }];
      else return currItems.map(item =>
      {
        if (item.id === id) return { ...item, quantity: item.quantity + 1 };
        else return item;
      })
    }
  );
  const decreaseCartQuantity = id => setCartItems(
    currItems =>
    {
      if (currItems.find(item => item.id === id) == null)
        return currItems.filter(item => item.id !== id);
      else return currItems.map(item =>
      {
        if (item.id === id) return { ...item, quantity: item.quantity - 1 };
        else return item;
      })
    }
  );
  const removeItemFromCart = id => setCartItems(currItems => currItems.filter(item => item.id !== id));

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  useEffect(() =>
  {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getItemsQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeItemFromCart,
        openCart,
        closeCart,
        cartQuantity
      }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export const UseShoppingCart = () => useContext(ShoppingCartContext);

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "EGP",
  style: "currency",
});
export const FormatCurrency = (number) => {
  return CURRENCY_FORMATTER.format(number);
};