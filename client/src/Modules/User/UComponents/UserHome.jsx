import React from "react";
import { Box, Typography } from "@mui/material";

export default function UserHome() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Welcome to Flipify
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Discover products at great prices.
      </Typography>
    </Box>
  );
}
