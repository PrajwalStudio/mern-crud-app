import React from "react";
import { Container, TextField, Button, Typography, Box, Paper, Grid, Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserLogin() {
  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f1f3f6", p: 2 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 3, fontWeight: 600, color: "#2874f0" }}>
            Login
          </Typography>
          
          <Box component="form" sx={{ width: '100%' }}>
            <TextField 
              fullWidth 
              label="Enter Email/Mobile number" 
              variant="outlined" 
              margin="normal" 
              sx={{ mb: 2 }}
            />
            <TextField 
              fullWidth 
              label="Enter Password" 
              type="password" 
              variant="outlined" 
              margin="normal" 
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
              sx={{ mb: 2 }}
            />

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
              By continuing, you agree to Flipify's Terms of Use and Privacy Policy.
            </Typography>

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
                mb: 2
              }}
            >
              Login
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Button 
                component={Link} 
                to="/register" 
                sx={{ textTransform: "none", fontWeight: 600, color: "#2874f0" }}
              >
                New to Flipify? Create an account
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
