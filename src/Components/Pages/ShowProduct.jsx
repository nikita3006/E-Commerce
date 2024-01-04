import React from 'react';
import { useContext } from 'react';
import ProductContext from '../../Store/ProductContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import CartContext from '../../Store/CartContext';

function ShowProduct() {
  const productCtx = useContext(ProductContext);
  const cartCtx = useContext(CartContext) 
  // console.log(productCtx.products);
  // const email = localStorage.getItem("email")
  // console.log(email)

  return (
    <Row>
      {productCtx.products.map((item, index) => (
        <Col key={index} xs={12} sm={6} md={4}>
         
            <Card style={{ width: '18rem' }}>
            <Link to={`detailPage/${item.id}`}>
              <Card.Img variant="top" src={item.imageUrl} />
              </Link>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.price}</Card.Text>
                <Button variant="outline" onClick={()=>{
                  cartCtx.addToCart(item)
                }}>Add to cart</Button>
              </Card.Body>
            </Card>
        
        </Col>
      ))}
    </Row>
  );
}

export default ShowProduct;
