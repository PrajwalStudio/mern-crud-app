import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography } from "@mui/material";

export default function AddCategory() {
  const [form, setForm] = useState({
    catname: "",
    catdesc: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/category/add", form)
      .then((res) => {
        console.log(res.data);
        alert("Category Added Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error adding category");
      });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        width: 500,
        mx: "auto",
        mt: 8,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Add Category
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          name="catname"
          value={form.catname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Category Description"
          name="catdesc"
          value={form.catdesc}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1 }}
        >
          Add Category
        </Button>
      </form>
    </Paper>
  );
}
