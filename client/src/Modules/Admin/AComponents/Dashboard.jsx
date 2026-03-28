import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box>
      {/* Title */}
      <Typography variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Description */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        Welcome to the admin panel. Here you can manage users and products,
        add new data, and monitor your system easily.
      </Typography>

      {/* Cards */}
      <Box sx={{ display: "flex", gap: 2 }}>

        <Paper sx={{ p: 2, width: 220 }}>
          <Typography variant="h6">Manage Users</Typography>
          <Typography variant="body2">
            View and manage all registered users.
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, width: 220 }}>
          <Typography variant="h6">Manage Products</Typography>
          <Typography variant="body2">
            Add, update and delete products.
          </Typography>
        </Paper>

      </Box>
    </Box>
  );
}