import React from "react";
import { Box, Typography, Button, Container, Paper, Divider } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserHome() {
  return (
    <Box sx={{ backgroundColor: "#f1f3f6", minHeight: "calc(100vh - 64px)", py: 5 }}>
      <Container maxWidth="md">
        {/* Hero Section */}
        <Paper elevation={1} sx={{ p: 0, borderRadius: 2, overflow: 'hidden', mb: 4 }}>
          <Box sx={{ backgroundColor: "#2874f0", color: "#fff", p: 6, textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              Welcome to Flipify<span style={{ color: '#ffe500' }}>Plus</span>
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.95, mb: 4, fontWeight: 400 }}>
              Your trusted online marketplace for quality products
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/viewproduct"
              sx={{
                bgcolor: "#fff",
                color: "#2874f0",
                fontWeight: 600,
                px: 3,
                py: 1,
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              View Products
            </Button>
          </Box>
        </Paper>

        {/* Content Section */}
        <Paper elevation={1} sx={{ p: 5, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#212121" }}>
            About Us
          </Typography>
          <Typography sx={{ lineHeight: 2, color: "#666", fontSize: "1rem", mb: 4 }}>
            FlipifyPlus is dedicated to providing you with the best shopping experience. 
            We offer a carefully curated selection of high-quality products across multiple categories. 
            Our platform connects you with trusted sellers to ensure reliable and secure transactions.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#212121" }}>
            What We Offer
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ lineHeight: 2, color: "#666", fontSize: "1rem", mb: 2 }}>
              <strong>Quality Products:</strong> Every item on our platform meets our strict quality standards.
            </Typography>
            <Typography sx={{ lineHeight: 2, color: "#666", fontSize: "1rem", mb: 2 }}>
              <strong>Secure Transactions:</strong> Your payments and personal information are protected with advanced security measures.
            </Typography>
            <Typography sx={{ lineHeight: 2, color: "#666", fontSize: "1rem", mb: 2 }}>
              <strong>Reliable Service:</strong> We are committed to quick processing and timely delivery of your orders.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography sx={{ color: "#666", fontSize: "1rem", mb: 3 }}>
              Ready to explore our collection?
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/viewproduct"
              sx={{
                bgcolor: "#2874f0",
                color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1,
                "&:hover": { bgcolor: "#1d47c7" },
              }}
            >
              Start Shopping
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
