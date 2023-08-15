import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import forget from './Photos/forget.png'

function ForgetPassword() {
  return (
    <Box
      style={{
        display: "block",
        margin: '10% auto',
        width: "500px",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper style={{
        display: "grid",
        }} elevation={10}>
               <h3 style={{ margin: "10px" }}>Reset Password</h3>

        <image style = {{height: "300px", 
        backgroundImage : `url(${forget})`,
         backgroundRepeat: 'no-repeat', backgroundSize : 'contain', backgroundPosition: 'center'}} />
 
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          style={{ margin: "10px" }}
        />

        <Button variant="contained" style={{height : "40px", margin: "10px", fontWeight : 'bold' }}>Submit</Button>
      </Paper>
    </Box>
  );
}

export default ForgetPassword;

