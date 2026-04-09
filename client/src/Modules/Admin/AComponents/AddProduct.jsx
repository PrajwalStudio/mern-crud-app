import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper } from "@mui/material";

export default function AddProduct() {
  const [form, setForm] = useState({
    pname: "",
    pprice: "",
    pqty: "",
    pdesc: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/products/add", form);
      console.log("Product Added Successfully", response.data);
      alert("Product Added!!");

      setForm({
        pname: "",
        pprice: "",
        pqty: "",
        pdesc: "",
      });
    } catch (error) {
      console.log("Error While Inserting", error);
      alert("Failed to add product");
    }
  };
  return (
    <Paper sx={{ padding: 3, width: 500, margin: "auto", mt: 5 }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="pname"
          value={form.pname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Price"
          name="pprice"
          value={form.pprice}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Quantity"
          name="pqty"
          value={form.pqty}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description"
          name="pdesc"
          value={form.pdesc}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
      </form>
    </Paper>
  );
}