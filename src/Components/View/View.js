import React from 'react';
import { useAdsList } from '../../Store/productList';
import Header from '../Header/Header';


import './View.css';
function View() {
  const {productDetail,ads} = useAdsList()
  console.log(productDetail,'sdfsd')
  return (
    <>
    <Header/>
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productDetail.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productDetail.price} </p>
          <span>{productDetail.name}</span>
          <p>{productDetail.category}</p>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
    </>
  );
}
export default View;