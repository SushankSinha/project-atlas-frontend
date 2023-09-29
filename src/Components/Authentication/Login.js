import React, {useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import login from "./Photos/login.png";
import axios from 'axios'


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();
  
      try {

        const response = await axios.post(`https://atlas-tool-server.onrender.com/login`, {email : email, password : password}, {
          headers : {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json',
            'Accept'  : 'application/json'
          }
        });

        if(response.status === 200){
          window.alert("Login Successful");
          navigate('/')
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

        <image
          style={{textAlign: 'center',
          width: '100%',
            height: "300px",
            backgroundImage: `url(${login})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: 'center'
          }}
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

