import React from 'react'
import { useNavigate } from 'react-router'

const ProductCard = ({item}) => {
  const navigate = useNavigate()
  const showDetail = () => {
    navigate(`/product/${item.id}`);
    console.log("show detail")
  }
  return (
    <div onClick={showDetail}>
      <img className="product-img" src={item?.img}/>
      <div className={item.choice == true ? 'conscious' : ''}>{item?.choice == true? "Conscious choice" :""}</div>
      <div>{item?.title}</div>
      <div>{item?.price}</div>
      <div className={item.new == true? 'new' : ''}>{item?.new == true ? "신제품" : ""}</div>
    </div>
  )
}

export default ProductCard