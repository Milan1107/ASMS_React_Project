import { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "250px", // Increased width
  marginRight: "10px",
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Handlers for Login Menu
  const handleLoginClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setAnchorEl(null);
  };

  // Handlers for Filter Menu
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Navigate to Orders Page
  const handleOrdersClick = () => {
    navigate("/orders");
  };
  const handleRetailLoginClick = () => {
    navigate("/login-retail");
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#FFA500" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ color: "black" }}>
            <i>
              <b>ASMS</b>
            </i>
          </Typography>

          {/* Location */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOnIcon style={{ color: "black" }} />
            <Typography variant="subtitle1" style={{ color: "black" }}>
              Location
            </Typography>
          </Stack>

          {/* Search Bar and Search Button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Search>
              <SearchIcon style={{ color: "#888", marginRight: "5px" }} />
              <InputBase placeholder="Search" fullWidth />
            </Search>
            <Button
              variant="contained"
              sx={{ backgroundColor: "green", color: "#fff", textTransform: "none" }}
            >
              SEARCH
            </Button>
          </Box>

          {/* Filter Dropdown */}
          <IconButton
            sx={{ color: "black" }}
            onClick={handleFilterClick}
          >
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
            MenuListProps={{
              "aria-labelledby": "filter-button",
            }}
          >
            <MenuItem onClick={handleFilterClose}>Electronics</MenuItem>
            <MenuItem onClick={handleFilterClose}>Clothing</MenuItem>
            <MenuItem onClick={handleFilterClose}>Groceries</MenuItem>
            <MenuItem onClick={handleFilterClose}>Books</MenuItem>
            <MenuItem onClick={handleFilterClose}>Toys</MenuItem>
          </Menu>

          {/* Orders Button */}
          <IconButton
            sx={{ color: "black" }}
            onClick={handleOrdersClick}
          >
            <Typography variant="subtitle1" style={{ color: "black" }}>
              Orders 
            </Typography>
            
          </IconButton>

          {/* Cart Icon */}
          <IconButton sx={{ color: "black" }}>
            <ShoppingCartIcon />
          </IconButton>

          {/* Login Button */}
          <Button
            variant="outlined"
            sx={{
              color: "white",
              backgroundColor: "green",
              textTransform: "none",
            }}
            onClick={handleLoginClick}
          >
            LOGIN
          </Button>

          {/* Dropdown for Login Options */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLoginClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleRetailLoginClick}>Login for Retail</MenuItem>
            <MenuItem onClick={handleLoginClose}>Login for Agency</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
