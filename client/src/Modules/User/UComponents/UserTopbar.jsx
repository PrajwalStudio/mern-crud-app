import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  InputBase,
  styled,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  '&:hover': {
    backgroundColor: "#fff",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '400px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: "#2874f0",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: "0.9rem",
  },
}));

export default function UserTopbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("UserToken") || localStorage.getItem("usertoken");
  const settings = token ? ["Profile", "Logout"] : ["Login"];
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSettingClick = (setting) => {
    handleCloseMenu();

    if (setting === "Logout") {
      localStorage.removeItem("UserToken");
      localStorage.removeItem("usertoken");
      navigate("/login");
      return;
    }

    if (setting === "Profile") {
      navigate("/update");
      return;
    }

    navigate("/login");
  };
  
  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "#2874f0", color: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 64 }}>
          <Typography 
            variant="h5" 
            component={Link} 
            to="/" 
            sx={{ 
              textDecoration: "none", 
              color: "#fff", 
              fontWeight: 800, 
              fontStyle: 'italic',
              mr: 2,
              letterSpacing: -0.5
            }}
          >
            Flipify<span style={{ color: '#ffe500' }}>Plus</span>
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for products, brands and more"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/about"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              About
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/viewproduct"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Products
            </Button>
            <IconButton onClick={handleAvatarClick} sx={{ p: 0.5 }}>
              <Avatar sx={{ width: 34, height: 34, bgcolor: "#fff", color: "#2874f0", fontWeight: 700 }}>
                U
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
/* */