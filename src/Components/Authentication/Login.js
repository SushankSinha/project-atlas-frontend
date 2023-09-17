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

        const response = await axios.post(`https://atlas-tool-server.onrender.com/login`, {
          method: 'POST',
          headers : {
              Accept: 'applicationjson',
              "Content-Type" : 'applicationjson',
              "alg": "HS256",
              "typ": "JWT"

          },
          credentials : 'include'
      }, formData );

        console.log(response.data); 

        if(response.status === 200){
        
          const data = await response.json();
          localStorage.setItem('token', data.token);
          window.alert("Login Successful");
          navigate('/')
        }
          
      } catch (error) {
        
        console.error('Error:', error.message); 
        
        window.alert("Invalid Credentials")
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
