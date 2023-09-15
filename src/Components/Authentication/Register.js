import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import register from "./Photos/register.png";
import axios from "axios";


function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    type: "",
    password: "",
    cnfPassword: ""
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
  }, user);

    // console.log(response.data)

    if (response.status === 422) {
      window.alert('unsuccessful');
    } else {
      window.alert('successful');

      navigate("/login");
    }      
  } catch (error) {
        
      console.error('Error:', error.message);  // Handle any errors that occurred during the request
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

        <form method="POST">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            required={true}
            style={{ margin: "10px" }}
            value={user.name}
            onChange={handleInput}
            name="name"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            required={true}
            style={{ margin: "10px" }}
            value={user.email}
            onChange={handleInput}
            name="email"
          />

          <select
            aria-label="User Type"
            required={true}
            name="type"
            value={user.type}
            onClick={handleInput}
            style={{ margin: "10px", width: "480px", height: "55px" }}
            className="form-select"
          >
            <option defaultValue={true}>Admin</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Employee">Employee</option>
          </select>

          <TextField
            id="outlined-basic"
            label="Password"
            type="text"
            required={true}
            variant="outlined"
            style={{ margin: "10px" }}
            value={user.password}
            onChange={handleInput}
            name="password"
          />

          <TextField
            id="outlined-basic"
            label="Confirm Password"
            type="text"
            required={true}
            variant="outlined"
            style={{ margin: "10px" }}
            value={user.cnfPassword}
            onChange={handleInput}
            name="cnfPassword"
          />.


          <Button
            onClick={userData}
            variant="contained"
            style={{ fontWeight: "bold", margin: "10px" }}
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


