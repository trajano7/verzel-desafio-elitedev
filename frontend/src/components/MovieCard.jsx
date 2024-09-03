import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useFavorites } from "../store/AuthContext";

const MovieCard = ({ data, onDelete, onAdd }) => {
  const { username } = useParams();
  const user = localStorage.getItem("username");
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const releaseDate = new Date(data.release);
  const formattedDate = releaseDate.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  let formattedRating = Number(data.rating).toPrecision(2);
  const isFavorite = favorites.includes(data.id);
  const showFavBttn = (!username && user) || (username === user)

  const clickCardHandler = () => {
    navigate(`/movies/${data.id}`);
  };

  const onFavoriteButton = () => {
    if (isFavorite) {
      onDelete(data.id);
    } else {
      onAdd(data.id);
    }
  };

  return (
    <Card
      sx={{
        display: "inline-block",
        width: "140px",
        backgroundColor: "transparent",
        backgroundImage: "none",
        position: "relative",
      }}
    >
      {(showFavBttn) && (
        <Tooltip
          title={
            isFavorite
              ? "Remover dos meus favoritos"
              : "Adicionar aos meus favoritos"
          }
        >
          <IconButton
            onClick={onFavoriteButton}
            sx={{
              position: "absolute",
              top: 165,
              left: 95,
              backgroundColor: "hsl(216, 18%, 12%, 0.8)",
              "&:hover": {
                backgroundColor: "hsl(216, 18%, 3%, 9)",
              },
              zIndex: "1000",
            }}
          >
            {!isFavorite && (
              <FavoriteBorderRoundedIcon style={{ color: "white" }} />
            )}
            {isFavorite && <FavoriteRoundedIcon style={{ color: "white" }} />}
          </IconButton>
        </Tooltip>
      )}
      <CardActionArea onClick={clickCardHandler}>
        <CardMedia
          component="img"
          alt={data.title}
          height="210"
          sx={{ maxWidth: "100", borderRadius: "8px" }}
          image={data.posterURL}
        />
        <CardContent sx={{ padding: ".6rem .5rem" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: ".4em" }}
          >
            <StarIcon sx={{ fontSize: ".8rem", color: "#ebbd18" }} />
            <Typography
              display="inline"
              sx={{ fontWeight: "700", fontSize: ".8em" }}
            >
              {formattedRating}
            </Typography>
            <Typography display="inline" sx={{ fontSize: ".7em" }}>
              /10
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                wordWrap: "break-word",
                fontSize: ".8em",
                fontWeight: "600",
              }}
            >
              {data.title}
            </Typography>
            <Typography sx={{ fontSize: ".75em" }}>{formattedDate}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
