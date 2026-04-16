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

  const productsWithImages = filteredproducts.filter((product) => product.productimage);

  return (
    <Container>
      <h2>Products with Images</h2>

      {/* Dropdown */}
      <Select
        value={selectcategory}
        onChange={(e) => setSelectcategory(e.target.value)}
        sx={{ mb: 2, minWidth: 200 }}
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
        {productsWithImages.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={`${imageBaseUrl}/${p.productimage}`}
                alt={p.productname}
              />
              <CardContent>
                <Typography variant="h6">{p.productname}</Typography>
                <Typography>{p.productdesc}</Typography>
                <Typography>Qty: {p.productqty}</Typography>
                <Typography color="green">₹{p.productprice}</Typography>

                <Button variant="contained" fullWidth sx={{ mt: 1 }}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredproducts.length > 0 && productsWithImages.length === 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          No selected products have images yet.
        </Typography>
      )}
    </Container>
  );
}