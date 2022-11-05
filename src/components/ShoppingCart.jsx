import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { UseShoppingCart, FormatCurrency } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import storeItems from "../data/storeItems.json";

const ShoppingCart = ({ isOpen }) =>
{
  const { cartItems, closeCart } = UseShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Card</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(e => <CartItem key={e.id} {...e} />)}
          <div className="ms-auto fw-bold fs-5">
            Total {" "}
            {FormatCurrency(cartItems.reduce((total, cartItem) =>
            {
              const item = storeItems.find(i => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0))}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart