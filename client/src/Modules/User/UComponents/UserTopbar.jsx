import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, InputBase, styled } from "@mui/material";
import { Link } from "react-router-dom";
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

          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Button color="inherit" component={Link} to="/" sx={{ textTransform: "none", fontWeight: 600 }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about" sx={{ textTransform: "none", fontWeight: 600 }}>
              About
            </Button>
            <Button 
              component={Link} 
              to="/login" 
              sx={{ 
                backgroundColor: "#fff", 
                color: "#2874f0", 
                px: 4, 
                textTransform: "none", 
                fontWeight: 700,
                borderRadius: 0.5,
                "&:hover": { backgroundColor: "#f0f0f0" }
              }}
            >
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register" sx={{ textTransform: "none", fontWeight: 600 }}>
              Register
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
