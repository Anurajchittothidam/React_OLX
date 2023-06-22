import React, { useEffect } from 'react';
import { UserAuth } from '../../Store/AuthContext';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { async } from '@firebase/util';
function Header() {
  const history=useNavigate()
  const {user,logOut}=UserAuth()
  const handleLogOut =async()=>{
    await logOut()
    history('/login')
  }
  useEffect(()=>{
    if(!user){
      history('/login')
    }
  })
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={(()=>history('/'))} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user && `welcome${user.displayName}`}
          {!user &&<span onClick={(()=>history('/login'))}>Login</span>}
          {user &&<button onClick={handleLogOut}>LogOut</button>}
          <hr />
        </div>
        

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={(()=>history('/create'))}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
