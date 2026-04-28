import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Paper, Box, Grid, Button } from "@mui/material";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    axios
      .get("http://localhost:5000/api/bookings/getUserBookings", {
        headers: { "auth-token": token },
      })
      .then((res) => setBookings(res.data.bookings || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", p: 2, bgcolor: "#f6f8fa" }}>
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ mb: 2 }}>
          My Bookings
        </Typography>

        <Grid container spacing={2}>
          {bookings.map((b) => (
            <Grid item xs={12} key={b._id}>
              <Paper sx={{ p: 2 }}>
                <Typography sx={{ fontWeight: 700 }}>{b.fullname}</Typography>
                <Typography color="text.secondary">Product: {b.productId?.productname || b.productId}</Typography>
                <Typography>Quantity: {b.quantity}</Typography>
                <Typography>Amount: ₹{b.totalamount}</Typography>
                <Typography>Status: {b.status}</Typography>
              </Paper>
            </Grid>
          ))}

          {bookings.length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography color="text.secondary">No bookings found.</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
