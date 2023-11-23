import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import forget from "./Photos/forget.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { FormControl } from "@mui/material";

function ForgetPassword() {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [form, setForm] = useState(true);

  const navigate = useNavigate();

  async function passwordSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.put(`/reset_password/new_password`, {
        email: emailData,
        password: passwordData,
      });

      if (response.status === 201) {
        alert('Logged out Successfully')
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  function formControl() {
    if (emailData.length > 3 && passwordData.length > 3) {
      setForm(false);
    }
  }

  return (
    <div>
      <form>
        <Box
          style={{
            display: "block",
            margin: "10% auto",
            maxWidth: "80%",
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
            <h2 style={{ margin: "20px auto" }}>Reset Password</h2>

            <image
              style={{
                height: "300px",
                backgroundImage: `url(${forget})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            />
            <FormControl>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                style={{ margin: "10px" }}
                value={emailData}
                type="email"
                onChange={(e) => {
                  setEmailData(e.target.value);
                  formControl();
                }}
                required="true"
              />

              <TextField
                id="password"
                label="New Password"
                variant="outlined"
                style={{ margin: "10px" }}
                value={passwordData}
                type="text"
                onChange={(e) => {
                  setPasswordData(e.target.value);
                  formControl();
                }}
                required="true"
              />
            </FormControl>

            <Button
              onClick={passwordSubmit}
              variant="contained"
              style={{ height: "40px", margin: "10px", fontWeight: "bold" }}
              disabled={form}
            >
              Submit
            </Button>

            <h4 style={{ margin: "10px", fontSize: "15px" }}>
              Login? <Link to="/login">Login</Link>{" "}
            </h4>
          </Paper>
        </Box>
      </form>
    </div>
  );
}

export default ForgetPassword;