import React from "react";
import { Container, Typography, Paper, Box, Divider } from "@mui/material";

export default function UserAbout() {
  return (
    <Box sx={{ backgroundColor: "#f1f3f6", minHeight: "calc(100vh - 64px)", py: 5 }}>
      <Container maxWidth="md">
        <Paper elevation={1} sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ backgroundColor: "#2874f0", color: "#fff", p: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
              Flipify<span style={{ color: '#ffe500' }}>Plus</span>
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Discover the story behind your favorite shopping destination
            </Typography>
          </Box>
          
          <Box sx={{ p: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#212121" }}>
              Who We Are
            </Typography>
            <Typography sx={{ lineHeight: 2, color: "#666", fontSize: "1.1rem", mb: 4 }}>
              Welcome to <strong>FlipifyPlus</strong>. We are committed to providing you with the best of trendy and high-quality products, 
              concentrating on reliability, customer service, and uniqueness. 
              Our mission is to deliver a smooth and reliable shopping experience for every customer.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#212121" }}>
              Our Promise
            </Typography>
            <Typography sx={{ lineHeight: 2, color: "#666", fontSize: "1.1rem" }}>
              We believe in the power of variety and accessibility. From electronics to fashion, our curated collections 
              ensure that you find exactly what you need at the prices you love. Thank you for choosing us!
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}