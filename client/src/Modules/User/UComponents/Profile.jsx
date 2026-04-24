import React, { useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const token = localStorage.getItem("UserToken");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setProfile(res.data.udata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const updateProfile = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/updateProfile",
        profile,
        {
          headers: { "auth-token": token },
        },
      );

      alert("Profile Updated Successfully");
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Error updating profile");
    }
  };
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={5} sx={{ width: 500, p: 3 }}>
        <Typography variant="h5" mb={2}>
          Update Profile
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={profile.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            value={profile.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="phone"
            label="Phone"
            value={profile.phone}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            name="address"
            label="Address"
            value={profile.address}
            onChange={handleChange}
          />
          <Button variant="contained" color="success" onClick={updateProfile}>
            Update Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
