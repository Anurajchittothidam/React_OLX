import React from 'react';
import './App.css';
import {Route,Routes } from 'react-router-dom';
import { AuthContextProvider } from './Store/AuthContext';
import { AdsListContextProvider } from './Store/productList';
import { CreateAdContextProvider } from './Store/createAdContext';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import SignUp from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Components/Create/Create';
import View from './Components/View/View';

function App() {
  return (
    <div>
      <AuthContextProvider>
      <AdsListContextProvider>
    <CreateAdContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/detailedview' element={<View/>}/>
        </Routes>
    </CreateAdContextProvider>
        </AdsListContextProvider>
      </AuthContextProvider>
        
    </div>
  );
}

export default App;
