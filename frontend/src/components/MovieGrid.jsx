import { Grid2 } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onDelete, onAdd }) => {
  return (
    <Grid2 container spacing={2} sx={{ justifyContent: "center" }}>
      {movies.map((value, key) => (
        <Grid2 key={value.id} >
          <MovieCard data={value} onDelete={onDelete} onAdd={onAdd} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default MovieGrid;
