import React,{useState,useContext} from 'react'
import {Link as RouterLink ,useNavigate} from 'react-router-dom'
import '../styles/Login.css'
import '../styles/Register.css'
import AuthContext from '../context/AuthContext'
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios"
const Register = () => {
  const {registerUser} = useContext(AuthContext)
  const [credentials,setCredentials] = useState({
    "name":"",
    "email":"",
    "password":"",
    "confirmPassword":""
  })
  const handleInputChange = (event) =>{
    const {name,value} = event.target
    setCredentials({...credentials,[name]:value})
  }
  const reactNavigator = useNavigate();
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        
            const response = await axios.post("http://localhost:5000/auth/google-login", {
                token: tokenResponse.access_token,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                reactNavigator("/dashboard");
            } 
        
    },
  
});
  const handleSubmit = (event) => {
    event.preventDefault()
    if(!credentials.email || !credentials.password || !credentials.confirmPassword){
        alert("Enter all the required fields")
        return;
    }
    if(credentials.password !== credentials.confirmPassword){
        alert("Passwords are not matching. Please try again!")
        return;
    }
    registerUser(credentials)
  }
  
  return (
    <div>
      <nav className="navbar">
      <h1 className="logo"><RouterLink to="/" id="logo-link">Mini CRM</RouterLink></h1>
      <div className="auth-buttons">
      <RouterLink to="/login"><button>Login</button></RouterLink>
      </div>
    </nav>
    <div className="registration-container">
      <h2 className="registration-heading">Create Your Account</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" className="registration-input" placeholder="Name" value={credentials.name} name="name" onChange={handleInputChange} required/>
        </div>
        <div className="input-container">
          <input type="email" className="registration-input" placeholder="Email Address" value={credentials.email} name="email" onChange={handleInputChange} required/>
        </div>
        <div className="input-container">
          <input type="password" className="registration-input" placeholder="Password" value={credentials.password} name="password" onChange={handleInputChange} required/>
        </div>
        <div className="input-container">
          <input type="password" className="registration-input" placeholder="Confirm Password" value={credentials.confirmPassword} name="confirmPassword" onChange={handleInputChange} required/>
        </div>
        <button type="submit" className="registration-button">Register</button>
      </form>
      <p className="login-text">Already have an account? <RouterLink to="/login">Login</RouterLink></p>
      <button onClick={handleGoogleLogin} >GOOGLE</button>
    </div>
    </div>
  )
}

export default Register
