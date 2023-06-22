import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { UserAuth } from '../../Store/AuthContext';

export default function Signup() {
  const {fireError,signUp}=UserAuth()
  console.log('fireError',fireError)
  const history=useNavigate()
  const [userName,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async(e) => {
    const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^[^\s]{6,}$/
    const phoneRegex=/^[0-9]{10}$/
    try{
    e.preventDefault();
      if(!stringRegex.test(userName)){
        setError('Invalid User Name')
        setShowError(true)
        return false
      }else if(!emailRegex.test(email)){
        setError('Invalid Email')
        setShowError(true)
        return false
      }else if(!phoneRegex.test(phoneNumber)){
        setError('Invalid phone number')
        setShowError(true)
        return false
      }else if(!passwordRegex.test(password)){
        setError('Invalid Password ! Make a strong Password')
        setShowError(true)
        return false
      }else{
        setIsLoading(true)
        await signUp(email,password,userName,phoneNumber)
          setError(fireError)
          setShowError(true)
          history('/login')
        setIsLoading(false)
      }
    }catch(err){
      console.log(err)
      setError('something went wrong')
      setShowError(true)
    }
  
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        showError && setShowError(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [showError])
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" alt='logo' height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onChange={((e)=>setName(e.target.value))}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            onChange={((e)=>setEmail(e.target.value))}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            onChange={((e)=>setPhoneNumber(e.target.value))}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            onChange={((e)=>setPassword(e.target.value))}
            name="password"
            defaultValue="Doe"
          />
          {showError && (
            <div
              className="p-4 my-2 text-sm text-danger rounded-lg"
              role="alert"
            >
              <span className="font-medium text-dange">{error}</span>
            </div>
          )}
          {isLoading ?(
            <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
          </div>
          </div>
          ):(
            <div>
            <br />
            <br />
            <button>Signup</button>              
            </div>
          )}
        </form>
        <a href='#'>Login</a>
      </div>
    </div>
  );
}
