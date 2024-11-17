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
  Grid,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const reactNavigator = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await axios.post(
        "https://crm-campaign.onrender.com/auth/google-login",
        {
          token: tokenResponse.access_token,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        reactNavigator("/dashboard");
      }
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      alert("Enter all the required fields");
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords are not matching. Please try again!");
      return;
    }
    registerUser(credentials);
  };

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
          Create Your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
          />
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
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            name="confirmPassword"
            value={credentials.confirmPassword}
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
            Register
          </Button>
        </form>
        <Typography
          variant="body2"
          sx={{ mt: 3, mb: 2, color: "#555", fontSize: "14px" }}
        >
          Already have an account?{" "}
          <RouterLink to="/login" style={{ color: "#080A45" }}>
            Login
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
          Sign up with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
