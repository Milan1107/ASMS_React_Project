import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar, Button, IconButton, InputBase, Stack,
  Toolbar, Typography, Box, Menu, MenuItem, Avatar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "250px",
}));

const Header = () => {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [loginAnchorEl, setLoginAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login-retail");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFA500" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "black" }}>
          <b>ASMS</b>
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <LocationOnIcon style={{ color: "black" }} />
          <Typography variant="subtitle1" style={{ color: "black" }}>Location</Typography>
        </Stack>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Search>
            <SearchIcon style={{ color: "#888", marginRight: "5px" }} />
            <InputBase placeholder="Search" fullWidth />
          </Search>
          <Button variant="contained" sx={{ backgroundColor: "green" }}>SEARCH</Button>
        </Box>

        <IconButton sx={{ color: "black" }} onClick={(e) => setFilterAnchorEl(e.currentTarget)}>
          <FilterListIcon />
        </IconButton>
        <Menu
  anchorEl={filterAnchorEl} // Attach menu to the filter button
  open={Boolean(filterAnchorEl)}
  onClose={() => setFilterAnchorEl(null)}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
>
  <MenuItem>Soaps & Body Wash</MenuItem>
  <MenuItem>Shampoos & Conditioners</MenuItem>
  <MenuItem>Skincare</MenuItem>
  <MenuItem>Oral Care</MenuItem>
  <MenuItem>Deodorants & Fragrances</MenuItem>
  <MenuItem>Detergents & Fabric Care</MenuItem>
  <MenuItem>Dishwashing</MenuItem>
  <MenuItem>Household Cleaning</MenuItem>
  <MenuItem>Tea & Coffee</MenuItem>
  <MenuItem>Ice Creams & Frozen Desserts</MenuItem>
  <MenuItem>Soups, Ketchup & Spreads</MenuItem>
  <MenuItem>Health Drinks</MenuItem>
</Menu>


        <IconButton sx={{ color: "black" }} onClick={() => navigate("/cart")}>
          <ShoppingCartIcon />
        </IconButton>

        {user ? (
          <>
            <IconButton onClick={(e) => setProfileAnchorEl(e.currentTarget)}>
              <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={() => setProfileAnchorEl(null)}
            >
              <MenuItem disabled>{user.username}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              sx={{ backgroundColor: "green", color: "white" }}
              onClick={(e) => setLoginAnchorEl(e.currentTarget)}
            >
              LOGIN
            </Button>
            <Menu
              anchorEl={loginAnchorEl}
              open={Boolean(loginAnchorEl)}
              onClose={() => setLoginAnchorEl(null)}
            >
              <MenuItem onClick={() => navigate("/login-retail")}>
                Login for Retail
              </MenuItem>
              <MenuItem onClick={() => navigate("/login-agency")}>
                Login for Agency
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;