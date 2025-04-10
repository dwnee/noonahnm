import React, {useEffect, useState} from 'react'
import {Container, Row, Col} from "react-bootstrap"
import ProductCard from '../component/ProductCard'
import { useSearchParams } from 'react-router'


const ProductAll = () => {
  const [productList,setProductList]=useState([])
  const [query, setQuery] = useSearchParams();
  const getProducts= async()=>{
    let searchQuery = query.get('q') || "";
    console.log(searchQuery, "Query 값은?")
    let url = `https://my-json-server.typicode.com/dwnee/noonahnm/products?q=${searchQuery}`
    let response = await fetch(url);
    let data = await response.json()
    setProductList(data)
    console.log(productList)
  }
  useEffect(()=>{
    getProducts()
  },[query])
  return (
    <div>
      <Container>
        <Row>
        {productList.map((item)=> (
          <Col xs={12} lg={3}>
            <ProductCard item={item} />
          </Col>
        ))}
        </Row>
      </Container>
    </div>
  )
}

export default ProductAll