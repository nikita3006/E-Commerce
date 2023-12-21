import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProductContext from "../../Store/ProductContext";

function ProductDetail() {
  const params = useParams(); //fetching id
  const productCtx = useContext(ProductContext); //getting the data using context API
  const detailProduct = productCtx.products.find(
    (product) => product.id == params.id
  ); ///checking particular id
  console.log(detailProduct);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={detailProduct.imageUrl} />
        <Card.Body>
          <Card.Title>{detailProduct.title}</Card.Title>  
        </Card.Body>
        <Card.Body>
          <Card.Link href="#">{detailProduct.price}</Card.Link>
          <Button variant="outline-success">Success</Button>{' '}
        </Card.Body>
      </Card>
    </>
  );
}

export default ProductDetail;
