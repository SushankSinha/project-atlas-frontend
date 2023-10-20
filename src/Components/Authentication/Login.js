import React, {useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import login from "./Photos/login.png";
import api from '../api'
import Cookies from 'js-cookie';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();
  
      try {

        const response = await api.post(`/login`, {email : email, password : password});

        if(response.status === 200){
          window.alert("Login Successful");
          console.log(response.data.token)
          Cookies.set('token', response.data.token)
          navigate('/');
          window.location.reload();
        }
  
      } catch (error) {
        alert("Invalid credentials")
       console.log(error)
      }

    };

  return (
    < form method = 'POST'>
    <Box
      style={{
        display: "block",
        margin: "5% auto",
        maxWidth: "80%",
        height: "fit-content",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        style={{
          display: "grid",
        }}
        elevation={10}
      >
        <h2 style={{ margin: "20px auto", display : 'block' }}>Login</h2>

        <picture
          style={{textAlign: 'center',
          width: '100%',
            height: "300px",
            backgroundImage: `url(${login})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: 'center'
          }}
          alt="Login"
        />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          style={{ margin: "10px" }}
          name = 'email'
          required = {true}
          value = {email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          style={{ margin: "10px" }}
          name = 'password'
          required = {true}
          value = {password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button
          onClick = {handleSubmit}
          variant="contained"
          style={{ fontWeight: "bold", margin: "10px" }}
        >
          Login
        </Button>

        <h5 style={{ margin: "10px", fontSize : '15px' }}><Link to="/reset_password">Reset Password</Link> | <Link to="/register">Create an Account</Link>
        </h5>
      </Paper>
    </Box>
    </ form>
  );
}

export default Login;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//       }
//       const { data } = await axios.post(
//         "http://localhost:4000",
//         {},
//         { withCredentials: true }
//       );
//       const { status, user } = data;
//       setUsername(user);
//       return status
//         ? toast(`Hello ${user}`, {
//             position: "top-right",
//           })
//         : (removeCookie("token"), navigate("/login"));
//     };
//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);
//   const Logout = () => {
//     removeCookie("token");
//     navigate("/signup");
//   };