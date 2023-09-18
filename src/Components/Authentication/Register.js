import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import register from "./Photos/register.png";
import axios from "axios";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function userData(e){
    e.preventDefault();

    try{

    const response = await axios.post(`https://atlas-tool-server.onrender.com/register`,{
      method: 'POST',
      headers : {
          Accept: 'applicationjson',
          "Content-Type" : 'applicationjson'

      },
      credentials : 'include'
  }, {name : name, email : email, password : password});

    // console.log(response.data)

    if (response.status === 201) {
      window.alert('successful');

      navigate("/login");
    }      
  } catch (error) {
        
      console.error('Error:', error.message);  

      window.alert("Failed to register")
    }
  };

  console.log(user)

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

        <image
          style={{textAlign: 'center',
          width: '100%',
            height: "30vh",
            backgroundImage: `url(${register})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: 'center'
          }}
        />

        <form method="POST" style = {{display : 'flex', flexDirection : 'column'}}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            required={true}
            style={{ margin: "10px", width : '90%' }}
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            name="name"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            required={true}
            style={{ margin: "10px", width : '90%' }}
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            name="email"
          />

          <TextField
            id="outlined-basic"
            label="Password"
            type="text"
            required={true}
            variant="outlined"
            style={{ margin: "10px", width : '90%' }}
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            
          />


          <Button
            onClick={userData}
            variant="contained"
            style={{ fontWeight: "bold", margin: "5%", width : '90%' }}
          >
            Sign Up
          </Button>

          <h6 style={{ margin: "10px" }}>
            Already a member? <Link to="/login">Log In</Link>
          </h6>
        </form>
      </Paper>
    </Box>
    </form>
  );
}

export default Register;


