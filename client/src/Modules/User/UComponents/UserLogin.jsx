import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogin() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });

    console.log({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {

    
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/users/login", login)
      .then((res) => {
        console.log(res);
        if(res.data.success){
          localStorage.setItem("UserToken",res.data.token)
          alert(res.data.message)
          navigate("/")
        }else{
          alert(res.data.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f3f6",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 3,
              fontWeight: 600,
              color: "#2874f0",
            }}
          >
            Login
          </Typography>

          <Box component="form" onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  value={login.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={login.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#fb641b",
                color: "#fff",
                py: 1.5,
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: 0.5,
                "&:hover": { backgroundColor: "#e65a16" },
                mt: 3,
                mb: 2,
              }}
            >
              LOGIN
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Button
                component={Link}
                to="/register"
                sx={{
                  backgroundColor: "#fff",
                  color: "#2874f0",
                  width: "100%",
                  py: 1.5,
                  boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                New User? Register
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
