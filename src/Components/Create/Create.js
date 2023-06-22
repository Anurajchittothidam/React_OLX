import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { UserAuth } from '../../Store/AuthContext';
import { useCreateAd } from '../../Store/createAdContext';
import {useNavigate} from 'react-router-dom'
const Create = () => {
  const {user}=UserAuth()
  const {createNewAds}=useCreateAd()
  const history=useNavigate()
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault()
    await createNewAds(user,name,category,price,image)
    history('/')
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={((e)=>setName(e.target.value))}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={((e)=>setCategory(e.target.value))}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" onChange={((e)=>setPrice(e.target.value))} name="Price" />
            <br />
          <br />
          {image &&<img alt="Posts" width="200px"  height="200px" src={image? URL.createObjectURL(image):''}></img>}
            <br />
            <input type="file" onChange={((e)=>setImage(e.target.files[0]))} />
            <br />
            <button className="uploadBtn">upload and Submit</button>
            </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
