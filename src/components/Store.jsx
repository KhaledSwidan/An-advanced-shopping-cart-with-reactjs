import React from 'react';
import { Col, Row } from 'react-bootstrap';
import storeItems from "../data/storeItems.json";
import StoreItem from "./StoreItem";
  
const Store = () =>
{
  return (
    <>
      <h1>Store</h1>
      <Row lg={3} md={2} xs={1} className="g-3">
        {
          storeItems.map(e =>
            <Col key={e.id}>
              <StoreItem {...e} />
            </Col>
          )
        }
      </Row>
    </>
  );
};

export default Store