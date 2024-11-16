import React,{useState,useContext} from 'react'
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import '../styles/Login.css'
import AuthContext from "../context/AuthContext"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'

const Login = () => {
  const {loginUser} = useContext(AuthContext)
  const [credentials,setCredentials] = useState({
    email:"",
    password:""
  })
  const handleInputChange = (event) =>{
    const {name,value} = event.target
    setCredentials({...credentials,[name]:value})
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if(!credentials.email || !credentials.password){
        alert("Enter all the required fields")
        return;
    }

    loginUser(credentials)
  }
  // const handleGoogleSuccess = (response) => {
  //   const userObject = jwtDecode(response.credential); 
  //   console.log(userObject);

  //   const googleUser = {
  //     email: userObject.email,
  //     password: "undefined"
  //   };

  //   loginUser(googleUser);
  // };
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
  return (
    <div>
      <nav className="navbar">
      <h1 className="logo"><RouterLink to="/" id="logo-link">Mini CRM</RouterLink></h1>
      <div className="auth-buttons">
      <RouterLink to="/register"><button>Register</button></RouterLink>
      </div>
    </nav>
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" className="login-input" placeholder="Email Address" name="email" value={credentials.email} onChange={handleInputChange} required/>
        <input type="password" className="login-input" placeholder="Password" name="password" value={credentials.password} onChange={handleInputChange} required/>
        <button type="submit" className="login-button">Login</button>
        <p className="create-account-text">Don't have an account? <RouterLink to="/register">Create One</RouterLink></p>
        <button onClick={handleGoogleLogin} >GOOGLE</button>
      </form>
      
    </div>
    </div>
  )
}

export default Login
