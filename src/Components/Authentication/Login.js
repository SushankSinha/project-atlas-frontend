import React, {useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import login from "./Photos/login.png";
import axios from 'axios'

function Login() {

  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const navigate = useNavigate()

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      try {

        const response = await axios.post('http://localhost:7000/login', formData);

        console.log(response.data); 

        if(response.status === 400){
          window.alert("Invalid Credentials")
        } else {
          window.alert("Login Successful");
          navigate('/')
        }
  
      } catch (error) {
        
        console.error('Error:', error.message);  // Handle any errors that occurred during the request
      }

    };

  return (
    < form method = 'POST'>
    <Box
      style={{
        display: "block",
        margin: "2% auto",
        maxWidth: "50%",
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
        <h3 style={{ margin: "10px auto", display : 'block' }}>Login</h3>

        <image
          style={{textAlign: 'center',
          width: '50%',
            height: "300px",
            backgroundImage: `url(${login})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          style={{ margin: "10px" }}
          name = 'email'
          value = {formData.email}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          style={{ margin: "10px" }}
          name = 'password'
          value = {formData.password}
          onChange={handleChange}
        />

        <Button
          onClick = {handleSubmit}
          // onClick = {loginUser}
          variant="contained"
          style={{ fontWeight: "bold", margin: "10px" }}
        >
          Login
        </Button>

        <h6 style={{ margin: "10px" }}><Link to="/reset_password">Reset Password</Link> | <Link to="/register">Create an Account</Link>
        </h6>
      </Paper>
    </Box>
    </ form>
  );
}

export default Login;
