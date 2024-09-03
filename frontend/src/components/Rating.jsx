import StarIcon from "@mui/icons-material/Star";
import { Box, Typography } from "@mui/material";

const Rating = ({ rating, voteCount, size = "large" }) => {
  let ratingStyle = { fontWeight: "700", fontSize: "1.5rem" };
  let miscStyle = { fontSize: "1.2rem" };
  if (size === "small") {
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <StarIcon sx={{ ...miscStyle, color: "#ebbd18" }} />
        <Typography display="inline" sx={ratingStyle}>
          {rating}
        </Typography>
        <Typography display="inline" sx={miscStyle}>
          /10
        </Typography>
      </Box>
      <Box>
        {voteCount && (
          <Typography sx={{ fontSize: ".6rem"}}>
            {`Classificações no TMDB: ${voteCount}`}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Rating;
