import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Box, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';

const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.thumbnail}
        alt={product.title}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 600 }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {expanded ? product.description : `${product.description.substring(0, 100)}...`}
          {product.description.length > 100 && (
            <Button size="small" onClick={() => setExpanded(!expanded)} sx={{ p: 0, ml: 1 }}>
              {expanded ? 'Show less' : 'Show more'}
            </Button>
          )}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            ₹{product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through', ml: 1 }}>
            ₹{(product.price * 1.2).toFixed(2)}
          </Typography>
          <Chip label={`${product.discountPercentage}% off`} color="success" size="small" sx={{ ml: 'auto' }} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Rating: {product.rating} ⭐
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography variant="h6">Loading products...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f1f3f6', minHeight: 'calc(100vh - 64px)' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center', color: '#2874f0' }}>
        Welcome to Flipify
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
