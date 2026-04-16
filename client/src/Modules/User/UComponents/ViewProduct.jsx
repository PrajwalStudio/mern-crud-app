import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

export default function ViewProduct() {
  const [allproducts, setAllproducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectcategory, setSelectcategory] = useState("All");

  const imageBaseUrl = "http://localhost:5000/uploads";

  // Fetch data
  useEffect(() => {
    axios.get("http://localhost:5000/api/products/get")
      .then((res) => setAllproducts(res.data.fetchedProduct))
      .catch((err) => console.log(err));

    axios.get("http://localhost:5000/api/category/get")
      .then((res) => setCategory(res.data.fetchedCategory))
      .catch((err) => console.log(err));
  }, []);

  // Filter logic (simple)
  const filteredproducts =
    selectcategory === "All"
      ? allproducts
      : allproducts.filter(
          (p) =>
            String(p.categoryid?._id || p.categoryid) ===
            String(selectcategory)
        );

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2.5 }}>
        Products with Images
      </Typography>

      {/* Dropdown */}
      <Select
        value={selectcategory}
        onChange={(e) => setSelectcategory(e.target.value)}
        sx={{ mb: 3, minWidth: 220, bgcolor: "background.paper" }}
      >
        <MenuItem value="All">All</MenuItem>
        {category.map((c) => (
          <MenuItem key={c._id} value={c._id}>
            {c.catname}
          </MenuItem>
        ))}
      </Select>

      {/* Cards */}
      <Grid container spacing={2}>
        {filteredproducts.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id} sx={{ display: "flex" }}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box sx={{ height: 210, bgcolor: "#f4f6f8", p: 1.5 }}>
                {p.productimage ? (
                  <CardMedia
                    component="img"
                    image={`${imageBaseUrl}/${p.productimage}`}
                    alt={p.productname}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      color: "text.secondary",
                      fontSize: 14,
                    }}
                  >
                    No Image
                  </Box>
                )}
              </Box>
              <CardContent sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                    minHeight: 56,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.productname}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    minHeight: 40,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.productdesc}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Qty: {p.productqty}
                </Typography>
                <Typography sx={{ color: "success.main", fontWeight: 700 }}>
                  ₹{p.productprice}
                </Typography>

                <Button variant="contained" fullWidth sx={{ mt: "auto", borderRadius: 2, pt: 1, pb: 1 }}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredproducts.length === 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          No products found for the selected category.
        </Typography>
      )}
    </Container>
  );
}