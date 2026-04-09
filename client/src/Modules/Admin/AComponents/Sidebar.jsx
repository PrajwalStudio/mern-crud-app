import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/category";

import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(true);

  const menu = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/Admin/Dashboard" },
    { name: "ViewUser", icon: <GroupIcon />, path: "/Admin/ViewUser" },
    { name: "ViewProducts", icon: <Inventory2Icon />, path: "/Admin/ViewProducts" },
    { name: "AddProduct", icon: <AddIcon />, path: "/Admin/AddProduct" },
    { name: "AddCategory", icon: <CategoryIcon />, path: "/Admin/AddCategory" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* 🔹 Top Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Admin</Typography>
        </Toolbar>
      </AppBar>

      {/* 🔹 Sidebar */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{ width: drawerWidth }}
      >
        <Toolbar>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        <Divider />

        <List>
          {menu.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 🔹 Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}