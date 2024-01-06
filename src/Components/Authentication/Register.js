import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import register from "./Photos/register.png";
import api from "../api";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("developer");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  async function userData(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        `/register`,
        { name: name, email: email, role: role, password: password },
        { credentials: "include" }
      );

      if (response.status === 201) {
        window.alert("Account Created");

        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
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
          <h2 style={{ margin: "20px auto" }}>Sign Up</h2>

          <picture
            style={{
              textAlign: "center",
              width: "100%",
              height: "30vh",
              backgroundImage: `url(${register})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
            alt="Register"
          />

          <form method="POST">
            <TextField
              id="outlined-basic-name"
              label="Full Name"
              variant="outlined"
              required={true}
              type=""
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic-email"
              label="Email"
              type="email"
              variant="outlined"
              required={true}
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              id="outlined-basic-password"
              label="Password"
              type="password"
              required={true}
              variant="outlined"
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControl component="fieldset" style = {{margin : "10px"}}>
              <FormLabel component="legend">Select a User Role</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                row
              >
                <FormControlLabel
                  value="developer"
                  control={<Radio />}
                  label="Developer"
                />
                <FormControlLabel
                  value="projectAdmin"
                  control={<Radio />}
                  label="Project Admin"
                />
              </RadioGroup>
            </FormControl>

            <Button
              onClick={userData}
              variant="contained"
              style={{
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                margin: "10px auto",
                width: "95%",
              }}
            >
              Sign Up
            </Button>

            <h5 style={{ margin: "10px", fontSize: "15px" }}>
              Already a member? <Link to="/login">Log In</Link>
            </h5>
          </form>
        </Paper>
      </Box>
  );
}

export default Register;
