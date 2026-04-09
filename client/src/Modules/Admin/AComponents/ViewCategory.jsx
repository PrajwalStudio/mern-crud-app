import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function ViewCategory() {
  const API_BASE_URL = "http://localhost:5000/api/category";
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/get`);
      setCategories(res.data.fetchedCategory || []);
    } catch {
      alert("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setCategories((prev) => prev.filter((category) => category._id !== id));
      alert("Category deleted successfully");
    } catch {
      alert("Error deleting category");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/update/${editData._id}`, {
        catname: editData.catname,
        catdesc: editData.catdesc,
      });

      const updated = res.data.category;
      setCategories((prev) =>
        prev.map((category) => (category._id === updated._id ? updated : category))
      );
      setEditData(null);
      alert("Category updated successfully");
    } catch {
      alert("Error updating category");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>SL No</b>
              </TableCell>
              <TableCell>
                <b>Category Name</b>
              </TableCell>
              <TableCell>
                <b>Category Description</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.catname}</TableCell>
                <TableCell>{category.catdesc}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => setEditData({ ...category })}
                  >
                    Update
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(editData)} onClose={() => setEditData(null)}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            fullWidth
            value={editData?.catname || ""}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, catname: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Category Description"
            fullWidth
            multiline
            rows={3}
            value={editData?.catdesc || ""}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, catdesc: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditData(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
