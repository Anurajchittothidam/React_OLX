import React, { useEffect, useState } from 'react';
import { UserAuth } from '../../Store/AuthContext';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';
// import { reauthenticateWithRedirect } from 'firebase/auth';

function Login() {
  const {fireError,signIn} =UserAuth()
  const history=useNavigate()
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  async function handleSubmit(e){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    e.preventDefault()
   try{
    if(!emailRegex.test(email)){
      setError('Invalid email')
      setShowError(true)
      return false
    } else if (!password || password === null || password === undefined) {
      setError("Invalid Password!");
      setShowError(true);
      return false;
  } else{
      setIsLoading(true)
      await signIn(email,password)
      setError(fireError)
      setShowError(true)
      history('/')
      setIsLoading(false)
    }
    
   }catch(err){
    setError(err.message)
    setShowError(true)
   }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
        showError && setShowError(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [showError])

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={((e)=>setEmail(e.target.value))}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={((e)=>setPassword(e.target.value))}
            defaultValue="Doe"
          />
          {showError&& ( <div
              className="p-4 my-2 text-sm text-danger rounded-lg"
              role="alert"
            >
              <span className="font-medium text-dange">{error}</span>
            </div>)}
          {isLoading ? (
            <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
          </div>
          </div>
          ):(
            <div>
              <br />
              <br />
            <button>Login</button>
            </div>
          )}
        </form>
        <a onClick={(()=>history('/signup'))}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
