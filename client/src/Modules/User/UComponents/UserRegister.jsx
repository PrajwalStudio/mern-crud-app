import React, { useState } from "react";
import { Container, TextField, Typography, Button, Paper, Box, Grid, Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserRegister() {

const [formdata,setFormData]=useState({
  name:"",
  email:'',
  password:'',
  phone:'',
  address:''
})

const handleChange = (e) => {
  console.log({ ...formdata,[e.target.name]: e.target.value });
  setFormData({ ...formdata,[e.target.name]: e.target.value });
};
const insertUser=()=>{
  console.log("User registered",formdata)
  axios.post("http://localhost:5000/api/users/register",formdata)
  .then((response)=>{
    console.log("User Registered Successfully",response.data)
    alert("User Registerd!!")
  })
  .catch((error)=>{
    console.log("Error While registering",error)  
  })
}

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f1f3f6", p: 2 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 3, fontWeight: 600, color: "#2874f0" }}>
            Register
          </Typography>
          
          <Box component="form" sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth name="name" type="text" onChange={handleChange} label="Full Name" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="email" type="email" onChange={handleChange} label="Email Address" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="password"onChange={handleChange} label="Set Password" type="password" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="phone" type="tel" onChange={handleChange}label="Mobile Number" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="address" type="text" onChange={handleChange}label="Complete Address" variant="outlined" multiline rows={3} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="I agree to the Terms of Use and Privacy Policy"
                  sx={{ alignItems: 'flex-start' }}
                />
              </Grid>
            </Grid>

            <Button 
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
                mb: 2
              }}
              onClick={insertUser}
            >
              CONTINUE
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Button 
                component={Link} 
                to="/login" 
                sx={{ 
                  backgroundColor: "#fff", 
                  color: "#2874f0", 
                  width: '100%', 
                  py: 1.5, 
                  boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)',
                  textTransform: "none",
                  fontWeight: 600
                }}
              >
                Existing User? Log in
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
