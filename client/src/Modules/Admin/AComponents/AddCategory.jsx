import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const API_BASE_URL = "http://localhost:5000/api/category";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    catname: "",
    catdesc: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/add`, form);
      alert("Category Added Successfully");
      setForm({ catname: "", catdesc: "" });
      navigate("/Admin/ManageCategory");
    } catch {
      alert("Error adding category");
    }
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
