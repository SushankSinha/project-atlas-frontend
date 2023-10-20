import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import register from "./Photos/register.png";
import api from '../api'

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function userData(e){
    e.preventDefault();

    try{

    const response = await api.post(`/register`,  {name : name, email: email, password : password});

    if (response.status === 201) {
      window.alert('Account Created');

      navigate("/login");
    }      
  } catch (error) {
        
      alert(error.message)
    }
  };

  return (
    <form method="POST">
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
          display: "grid"
        }}
        elevation={10}
      >
        <h2 style={{ margin: "20px auto" }}>Sign Up</h2>

        <picture
          style={{textAlign: 'center',
          width: '100%',
            height: "30vh",
            backgroundImage: `url(${register})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: 'center'
          }}
          alt="Register"
        />

        <form method="POST">
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            required={true}
            style={{ margin: "10px", display: "flex",
          flexDirection : 'column' }}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            required={true}
            style={{ margin: "10px", display: "flex",
          flexDirection : 'column' }}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            type="text"
            required={true}
            variant="outlined"
            style={{ margin: "10px", display: "flex",
          flexDirection : 'column' }}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <Button
            onClick={userData}
            variant="contained"
            style={{ fontWeight: "bold", display: "flex",
          flexDirection : 'column', margin: "10px auto", width: '95%' }}
          >
            Sign Up
          </Button>

          <h5 style={{ margin: "10px", fontSize : '15px' }}>
            Already a member? <Link to="/login">Log In</Link>
          </h5>
        </form>
      </Paper>
    </Box>
    </form>
  );
}

export default Register