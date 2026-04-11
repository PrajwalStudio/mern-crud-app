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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>SL No</b>
            </TableCell>
            <TableCell>
              <b>Product Name</b>
            </TableCell>
            <TableCell>
              <b>Image</b>
            </TableCell>
            <TableCell>
              <b>Price</b>
            </TableCell>
            <TableCell>
              <b>Quantity</b>
            </TableCell>
            <TableCell>
              <b>Description</b>
            </TableCell>
            <TableCell>
              <b>Category</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.productname}</TableCell>
              <TableCell>
                <Avatar
                  variant="rounded"
                  src={
                    product.productimage
                      ? `http://localhost:5000/uploads/${product.productimage}`
                      : ""
                  }
                  alt={product.productname}
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>
              <TableCell>{product.productprice}</TableCell>
              <TableCell>{product.productqty}</TableCell>
              <TableCell>{product.productdesc}</TableCell>
              <TableCell>{product.categoryid?.catname || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}