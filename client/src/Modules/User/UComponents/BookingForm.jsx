import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  Grid,
} from "@mui/material";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    address: "",
    phone: "",
    quantity: 1,
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("UserToken");
      const payload = {
        ...form,
        productId: id,
        totalamount: product ? product.productprice * form.quantity : undefined,
      };

      const res = await axios.post("http://localhost:5000/api/bookings/add", payload, {
        headers: { "auth-token": token },
      });

      if (res.status === 201) {
        alert("Booking created");
        navigate("/mybookings");
      }
    } catch (error) {
      console.log(error);
      alert("Error creating booking");
    }
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", p: 2, bgcolor: "#f1f3f6" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Book Product
          </Typography>

          {product && (
            <Typography sx={{ mb: 2, color: "text.secondary" }}>
              {product.productname} — ₹{product.productprice}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="fullname"
                  label="Full name"
                  value={form.fullname}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  value={form.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  type="number"
                  value={form.quantity}
                  onChange={handleChange}
                  inputProps={{ min: 1 }}
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Confirm Booking
            </Button>
            <Button sx={{ mt: 2, ml: 2 }} onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
