import React, {useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link} from "react-router-dom";
import loginImg from "./Photos/login.png";
import { useAuth } from '../Context/AuthContext';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

    async function handleSubmit(e) {
      e.preventDefault();
  
      try {

        await login({email, password}, {credentials : 'include'});
  
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
            backgroundImage: `url(${loginImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: 'center'
          }}
          alt="Login"
        />

        <TextField
          id="outlined-basic-email"
          label="Email"
          type="email"
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
          type="password"
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