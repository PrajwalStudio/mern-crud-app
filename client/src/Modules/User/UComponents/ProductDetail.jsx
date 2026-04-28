import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Paper, Box, Grid, Button } from "@mui/material";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const imageBaseUrl = "http://localhost:5000/uploads";

  useEffect(() => {
    if (!id) return;
    axios
      .get("http://localhost:5000/api/products/get")
      .then((res) => {
        const found = (res.data.fetchedProduct || []).find((p) => p._id === id);
        setProduct(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ minHeight: "calc(100vh - 64px)", p: 4 }}>
        <Container maxWidth="md">
          <Typography>Loading product...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", p: 4, background: "#f7f9fb" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <Box sx={{ background: "#fff", p: 2, borderRadius: 2 }}>
                <img
                  src={`${imageBaseUrl}/${product.productimage}`}
                  alt={product.productname}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {product.productname}
              </Typography>
              <Typography sx={{ color: "text.secondary", mt: 1 }}>
                {product.productdesc}
              </Typography>

              <Typography sx={{ mt: 2, fontWeight: 700, color: "success.main" }}>
                ₹{product.productprice}
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary" }}>Available: {product.productqty}</Typography>

              <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
                <Button variant="contained" onClick={() => navigate(`/booking/${product._id}`)}>
                  Book Now
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
