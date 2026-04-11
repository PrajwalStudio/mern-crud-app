import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
} from "@mui/material";

export default function ViewProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/get");
        setProducts(res.data.fetchedProduct || []);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Recipe Style Product Cards
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
              }}
            >
              {product.productimage && (
                <CardMedia
                  component="img"
                  height="180"
                  image={`http://localhost:5000/uploads/${product.productimage}`}
                  alt={product.productname}
                  sx={{ objectFit: "cover" }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip
                  label={product.categoryid?.catname || "Uncategorized"}
                  color="primary"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {product.productname}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Qty: {product.productqty}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {product.productdesc}
                </Typography>
                <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                  Rs. {product.productprice}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button variant="contained" fullWidth>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
