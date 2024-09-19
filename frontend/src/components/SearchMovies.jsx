import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Form } from "react-router-dom";
import { useState } from "react";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
    padding: theme.spacing(1, 2, 1, 2),
    transition: theme.transitions.create("width"),
    width: "100%",
    marginLeft: 0,
  },
}));

const SearchMovies = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const changeQueryHandler = (event) => {
    const value = event.target.value;
    setQuery(value);
  }

  const searchHandler = () => {
    onSearch(query);
  }

  return (
    <Box sx={{ marginBottom: "3rem" }}>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginBottom: ".5rem" }}
      >
        Busque por um filme!
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "1rem",
        }}
      >
        <StyledInputBase
          sx={{ flexGrow: 1 }}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={changeQueryHandler}
          value={query}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          aria-label="search"
          onClick={searchHandler}
        >
          Buscar
        </Button>
      </Box>
    </Box>
  );
};

export default SearchMovies;
