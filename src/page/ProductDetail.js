import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";

const ProductDetail = ({ sizes = [] }) => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const [quantityError, setQuantityError] = useState("");
  useEffect(() => {
    getProductDetail();
  }, [id]); 
  useEffect(() => {
    if (product?.size && Array.isArray(product.size)) {
      // 상품 사이즈 길이에 맞게 quantities 배열 초기화
      setQuantities(new Array(product.size.length).fill(1));
    }
  }, [product]);  // product가 바뀔 때만 실행


  const getProductDetail = async () => {
    let url = `https://my-json-server.typicode.com/dwnee/noonahnm/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data, "DDDddddddd");
    setProduct(data);
    if (data?.size && Array.isArray(data.size)) {
      setQuantities(new Array(data.size.length).fill(1)); // sizes 길이에 맞게 초기화
    }
  };


  const handleChange = (index, value) => {
    let num = Number(value);
    if (num > 30) {
      setQuantityError("사이즈별 최대 구매 수량은 30입니다.");
      num = 30;
    } else if (num < 1) {
      setQuantityError("최소 1 이상 입력해주세요.");
      num = 1;
    } else {
      setQuantityError(""); // 에러 메시지 초기화
    }



    const updatedQuantities = [...quantities];
    updatedQuantities[index] = num; // 특정 인덱스 값만 업데이트
    setQuantities(updatedQuantities); // 상태 업데이트
  };
  const handleArrowClick = (index) => {
    if (quantities[index] >= 30) {
      setQuantityError("사이즈 별 최대 구매 수량은 30입니다.");  // 30일 때 오류 메시지 띄우기
    }
  };
  const handleFocus = (index) => {
    setQuantityError(""); // 입력창 클릭 시 에러 메시지 초기화
  };

  return (
    <Container>
      <Row>
        <Col className="product-img">
          <img src={product?.img} />
        </Col>
        <Col className="product-detail">
          <div className="product-title">{product?.title}</div>
          <div>{product?.price}</div>
          <div>{product?.choice === true ? "conscious choice" : ""}</div>
          <div>{product?.new === true ? "new" : ""}</div>
          {/* <div>{product?.size}</div> */}
          {product?.size && Array.isArray(product.size) && product.size.length > 0 ? (
            <div className="product-size">
              {product.size.map((size, index) => (
                <div key={size} className="d-flex align-items-center mb-2">
                  <strong style={{ width: 40 }}>{size}</strong>
                  <Form.Control
                    type="number"
                    value={quantities[index] || 1}
                    min="1"
                    max="30"
                    step="1"
                    onChange={(e) => handleChange(index, e.target.value)}
                    onFocus={handleFocus}
                    onClick={()=>handleArrowClick(index)}
                    style={{
                      width: "60px",
                      textAlign: "center",
                    }}
                  />
                </div>
              ))}
              {quantityError && (
                <div style={{ color: "orange", fontSize: "12px" }}>
                  {quantityError}
                </div>
              )}
            </div>
          ) : (
            <div>옵션이 없습니다.</div>
          )}
          <Button className="product-add" variant="dark">추가</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
