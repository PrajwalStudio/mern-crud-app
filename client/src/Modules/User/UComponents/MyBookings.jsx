import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Paper, Box, Grid, Button, Chip, Divider } from "@mui/material";
import { Link } from "react-router-dom";

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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f1f3f6", minHeight: "calc(100vh - 64px)", py: 5 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
            My Bookings
          </Typography>
          <Typography sx={{ color: "#666", fontSize: "1rem" }}>
            View and manage all your product bookings
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            component={Link}
            to="/viewproduct"
            variant="outlined"
            sx={{
              borderColor: "#2874f0",
              color: "#2874f0",
              fontWeight: 600,
              "&:hover": { bgcolor: "#f0f7ff" },
            }}
          >
            Continue Shopping
          </Button>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            sx={{
              borderColor: "#2874f0",
              color: "#2874f0",
              fontWeight: 600,
              "&:hover": { bgcolor: "#f0f7ff" },
            }}
          >
            Back to Home
          </Button>
        </Box>

        {/* Bookings Content */}
        {bookings.length > 0 ? (
          <Grid container spacing={3}>
            {bookings.map((b) => (
              <Grid item xs={12} key={b._id}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    borderLeft: "4px solid #2874f0",
                    "&:hover": { elevation: 3 },
                  }}
                >
                  <Grid container spacing={2} alignItems="flex-start">
                    {/* Booking Info */}
                    <Grid item xs={12} sm={8}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
                          {b.fullname}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
                        <Box>
                          <Typography sx={{ color: "#999", fontSize: "0.9rem", fontWeight: 500 }}>
                            Product
                          </Typography>
                          <Typography sx={{ color: "#212121", fontWeight: 500 }}>
                            {b.productId?.productname || "N/A"}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography sx={{ color: "#999", fontSize: "0.9rem", fontWeight: 500 }}>
                            Quantity
                          </Typography>
                          <Typography sx={{ color: "#212121", fontWeight: 500 }}>
                            {b.quantity}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography sx={{ color: "#999", fontSize: "0.9rem", fontWeight: 500 }}>
                            Total Amount
                          </Typography>
                          <Typography sx={{ color: "#2874f0", fontWeight: 700, fontSize: "1.1rem" }}>
                            ₹{b.totalamount}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography sx={{ color: "#999", fontSize: "0.9rem", fontWeight: 500 }}>
                            Status
                          </Typography>
                          <Chip
                            label={b.status || "Pending"}
                            color={getStatusColor(b.status)}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      {b.email && (
                        <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
                          <strong>Email:</strong> {b.email}
                        </Typography>
                      )}
                      {b.address && (
                        <Typography sx={{ color: "#666", fontSize: "0.9rem", mt: 1 }}>
                          <strong>Address:</strong> {b.address}
                        </Typography>
                      )}
                      {b.phonenumber && (
                        <Typography sx={{ color: "#666", fontSize: "0.9rem", mt: 1 }}>
                          <strong>Phone:</strong> {b.phonenumber}
                        </Typography>
                      )}
                    </Grid>

                    {/* Status Section */}
                    <Grid item xs={12} sm={4} sx={{ textAlign: { xs: "left", sm: "right" } }}>
                      <Box
                        sx={{
                          bgcolor: getStatusColor(b.status) === "success" ? "#f0f7f0" : 
                                   getStatusColor(b.status) === "error" ? "#fff0f0" : "#fff8f0",
                          p: 2,
                          borderRadius: 1,
                          textAlign: "center",
                        }}
                      >
                        <Typography sx={{ fontSize: "0.85rem", color: "#666", mb: 1 }}>
                          Booking Status
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            color: getStatusColor(b.status) === "success" ? "#10b981" :
                                   getStatusColor(b.status) === "error" ? "#ef4444" : "#f59e0b",
                          }}
                        >
                          {b.status || "Pending"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            elevation={1}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#212121" }}>
              No Bookings Found
            </Typography>
            <Typography sx={{ color: "#666", mb: 4 }}>
              You haven't made any bookings yet. Start exploring our products now!
            </Typography>
            <Button
              component={Link}
              to="/viewproduct"
              variant="contained"
              sx={{
                bgcolor: "#2874f0",
                color: "#fff",
                fontWeight: 600,
                px: 3,
                py: 1,
                "&:hover": { bgcolor: "#1d47c7" },
              }}
            >
              View Products
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
