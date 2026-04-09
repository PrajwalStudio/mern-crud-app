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
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/api/category/get")
      .then((res) => {
        setCategories(res.data.fetchedCategory || []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/category/delete/${id}`)
      .then(() => {
        setCategories((prev) => prev.filter((category) => category._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/api/category/update/${editData._id}`, {
        catname: editData.catname,
        catdesc: editData.catdesc,
      })
      .then((res) => {
        const updated = res.data.category;
        setCategories((prev) =>
          prev.map((category) =>
            category._id === updated._id ? updated : category
          )
        );
        setEditData(null);
      })
      .catch((err) => console.log(err));
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
