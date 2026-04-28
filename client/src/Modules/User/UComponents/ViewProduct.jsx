import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewProduct() {
  const navigate = useNavigate();
  const [allproducts, setAllproducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectcategory, setSelectcategory] = useState("All");

  const imageBaseUrl = "http://localhost:5000/uploads";

  // Fetch data
  useEffect(() => {
    axios.get("http://localhost:5000/api/products/get")
      .then((res) => setAllproducts(res.data.fetchedProduct))
      .catch((err) => console.log(err));

    axios.get("http://localhost:5000/api/category/get")
      .then((res) => setCategory(res.data.fetchedCategory))
      .catch((err) => console.log(err));
  }, []);

  // Filter logic (simple)
  const filteredproducts =
    selectcategory === "All"
      ? allproducts
      : allproducts.filter(
          (p) =>
            String(p.categoryid?._id || p.categoryid) ===
            String(selectcategory)
        );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2.5 }}>
        List of Products
      </Typography>

      {/* Dropdown */}
      <Select
        value={selectcategory}
        onChange={(e) => setSelectcategory(e.target.value)}
        sx={{ mb: 3, minWidth: 220, bgcolor: "background.paper" }}
      >
        <MenuItem value="All">All</MenuItem>
        {category.map((c) => (
          <MenuItem key={c._id} value={c._id}>
            {c.catname}
          </MenuItem>
        ))}
      </Select>

      {/* Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {filteredproducts.map((p) => (
          <Card
            key={p._id}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              minHeight: 420,
              border: "1px solid",
              borderColor: "grey.200",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 18px 40px rgba(15, 23, 42, 0.14)",
              },
            }}
          >
              <Box
                sx={{
                  height: 180,
                  p: 1.5,
                  background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
                }}
              >
                {p.productimage ? (
                  <CardMedia
                    component="img"
                    image={`${imageBaseUrl}/${p.productimage}`}
                    alt={p.productname}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      color: "text.secondary",
                      fontSize: 14,
                    }}
                  >
                    No Image
                  </Box>
                )}
              </Box>
              <CardContent
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 0.75,
                    minHeight: 56,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.productname}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1.25,
                    minHeight: 40,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.productdesc}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
                  Qty: {p.productqty}
                </Typography>
                <Typography sx={{ color: "success.main", fontWeight: 700 }}>
                  ₹{p.productprice}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: "auto", alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: 2, textTransform: "none", whiteSpace: "nowrap", flex: 1 }}
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    View More
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2, textTransform: "none", whiteSpace: "nowrap" }}
                    onClick={() => navigate(`/booking/${p._id}`)}
                  >
                    Book Now
                  </Button>
                </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredproducts.length === 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          No products found for the selected category.
        </Typography>
      )}
    </Container>
  );
}