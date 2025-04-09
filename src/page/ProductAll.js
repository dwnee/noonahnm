import React, {useEffect, useState} from 'react'
import {Container, Row, Col} from "react-bootstrap"
import ProductCard from '../component/ProductCard'


const ProductAll = () => {
  const [productList,setProductList]=useState([])
  const getProducts= async()=>{
    let url = `https://my-json-server.typicode.com/dwnee/noonahnm/products`
    let response = await fetch(url);
    let data = await response.json()
    setProductList(data)
    console.log(productList)
  }
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <div>
      <Container>
        <Row>
        {productList.map((item)=> (
          <Col lg={3}>
            <ProductCard className="card" item={item}/>
          </Col>
        ))}
        </Row>
      </Container>
    </div>
  )
}

export default ProductAll