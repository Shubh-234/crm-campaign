import React, { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const { loginUser, setUser } = useContext(AuthContext); // Extract setUser to update user state
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle form submission for email/password login
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!credentials.email || !credentials.password) {
      alert("Please fill in all required fields.");
      return;
    }
    await loginUser(credentials); // Login using AuthContext method
    navigate("/dashboard");
  };

  // Handle Google login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send the Google access token to the backend
        const response = await axios.post("https://crm-campaign.onrender.com/auth/google-login", {
          token: tokenResponse.access_token,
        });

        if (response.data.token) {
          // Save token and user data to localStorage and context
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user); // Update the user state with user data from backend
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Google login failed:", error);
        alert("Google login failed. Please try again.");
      }
    },
    scope: "openid email profile",
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#080A45" }}>
          Mini CRM
        </Typography>
      </Box>
      <Box
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          p: 4,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#080A45", mb: 2 }}
        >
          Login to Your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            sx={{ mb: 3 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#080A45",
              color: "white",
              "&:hover": { backgroundColor: "#575757" },
              py: 1.5,
            }}
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          sx={{ mt: 3, mb: 2, color: "#555", fontSize: "14px" }}
        >
          Don't have an account?{" "}
          <RouterLink to="/register" style={{ color: "#080A45" }}>
            Register
          </RouterLink>
        </Typography>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          fullWidth
          sx={{
            borderColor: "#080A45",
            color: "#080A45",
            "&:hover": {
              backgroundColor: "#080A45",
              color: "white",
            },
            py: 1.5,
          }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
