import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

export default function AddProduct() {
  const PRODUCT_API = "http://localhost:5000/api/products";
  const CATEGORY_API = "http://localhost:5000/api/category";

  const [form, setForm] = useState({
    pname: "",
    pprice: "",
    pqty: "",
    pdesc: "",
    pcategory: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${CATEGORY_API}/get`);
        setCategories(response.data.fetchedCategory || []);
      } catch (error) {
        console.log("Error while fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("pname", form.pname);
      formData.append("pprice", form.pprice);
      formData.append("pqty", form.pqty);
      formData.append("pdesc", form.pdesc);
      formData.append("pcategory", form.pcategory);

      if (productImage) {
        formData.append("pimage", productImage);
      }

      const response = await axios.post(`${PRODUCT_API}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product Added Successfully", response.data);
      alert("Product Added!!");

      setForm({
        pname: "",
        pprice: "",
        pqty: "",
        pdesc: "",
        pcategory: "",
      });
      setProductImage(null);
    } catch (error) {
      console.log("Error While Inserting", error);
      alert("Failed to add product");
    }
  };

  return (
    <Paper sx={{ padding: 3, width: 500, margin: "auto", mt: 5 }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="pcategory"
            value={form.pcategory}
            label="Category"
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.catname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {categories.length === 0 && (
          <Typography variant="body2" sx={{ mt: 1 }} color="error">
            No categories found. Please add a category first.
          </Typography>
        )}

        <TextField
          label="Product Name"
          name="pname"
          value={form.pname}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Price"
          name="pprice"
          value={form.pprice}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Quantity"
          name="pqty"
          value={form.pqty}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Description"
          name="pdesc"
          value={form.pdesc}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
          {productImage ? productImage.name : "Upload Product Image"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files?.[0] || null)}
          />
        </Button>

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