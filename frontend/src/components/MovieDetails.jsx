import { Box, Button, Card, styled, Typography } from "@mui/material";
import Rating from "./Rating";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MovieInfo from "./MovieInfo";
import { useFavorites } from "../store/AuthContext";

const StyledButton = styled(Button)(({ theme, color = "primary" }) => ({
  backgroundColor: "hsla(47, 84%, 51%, 1)",
  color: "hsl(220, 35%, 3%)",
  padding: ".2rem 1rem",
  lineHeight: "1rem",
  fontSize: ".75rem",
  ":hover": {
    color: "hsl(220, 35%, 2%)",
    backgroundColor: "hsla(47, 84%, 45%, 1)",
  },
}));

const MovieDetails = ({ movieData, onDelete, onAdd }) => {
  const user = localStorage.getItem("username");
  const { favorites } = useFavorites();

  const isFavorite = favorites.includes(movieData.id);
  const formattedRating = Number(movieData.rating).toPrecision(2);
  const favoriteIcon = isFavorite ? (
    <FavoriteRoundedIcon />
  ) : (
    <FavoriteBorderRoundedIcon />
  );

  const onFavoriteButton = () => {
    if (isFavorite) {
      onDelete(movieData.id);
    } else {
      onAdd(movieData.id);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        backgroundColor: (theme) => theme.palette.primary.dark,
        padding: "1.5rem",
        paddingBottom: ".2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          position: "relative",
          top: -40,
        }}
      >
        <Box
          component="img"
          sx={{ height: 275 }}
          alt={movieData.title}
          src={movieData.posterPath}
        ></Box>
        <Rating rating={formattedRating} voteCount={movieData.voteCount} />
       
          <StyledButton
            variant="contained"
            endIcon={favoriteIcon}
            onClick={onFavoriteButton}
            disabled={!user}
          >
            {!isFavorite ? "Adicionar aos Favoritos" : "Está na sua lista"}
          </StyledButton>
      </Box>
      <MovieInfo data={movieData} />
    </Box>
  );
};

export default MovieDetails;
