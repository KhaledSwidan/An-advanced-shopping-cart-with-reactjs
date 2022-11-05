import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { UseShoppingCart } from '../context/ShoppingCartContext';
import FormatCurrency from './FormatCurrency';

const StoreItem = ({ id, price, name, imgUrl }) =>
{
  const { getItemsQuantity, increaseCartQuantity, decreaseCartQuantity, removeItemFromCart } = UseShoppingCart();
  const quantity = getItemsQuantity(id);
  
  return (
    <Card className="h-100">
      <Card.Img
        src={imgUrl}
        variant="top"
        style={{ height: "200px", objectFit: "cover" }} />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span className='fs-2'>{name}</span>
          <span className='text-muted me-2'>{FormatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {
            quantity === 0 ? (<Button onClick={()=>increaseCartQuantity(id)} className="w-100">Add To Cart</Button>) :
              (<div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                <div className='d-flex justify-content-center align-items-center' style={{ gap: ".5rem" }}>
                  <Button onClick={()=>increaseCartQuantity(id)}>+</Button>
                  <span>{quantity} in Cart</span>
                  <Button onClick={()=>decreaseCartQuantity(id)}>-</Button>
                </div>
                <Button onClick={()=>removeItemFromCart(id)} variant='danger' size="sm">Remove</Button>
              </div>)
          }
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem