import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/get")
      .then((res) => {
        setProducts(res.data.fetchedProduct);
      })
      .catch((err) => console.log(err));
  }, []);

  const imageBaseUrl = "http://localhost:5000/uploads";

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Product Details
      </Typography>

      <Grid container spacing={2}>
        {products.map((product, index) => {
          const productImage = product.productimage
            ? `${imageBaseUrl}/${product.productimage}`
            : "";

          return (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 4 }}>
                <CardHeader
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={product.productname}
                  subheader={product.categoryid?.catname || "N/A"}
                />

                {productImage ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={productImage}
                    alt={product.productname}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "grey.100",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No Image
                    </Typography>
                  </Box>
                )}

                <CardContent>
                  <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                    <Chip label={`Price: ${product.productprice}`} color="primary" />
                    <Chip label={`Qty: ${product.productqty}`} variant="outlined" />
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {product.productdesc || "No description available"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}