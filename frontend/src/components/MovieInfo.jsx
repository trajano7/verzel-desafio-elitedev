import { Box, Divider, Typography } from "@mui/material";

function formatDateToDDMMYY(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Os meses são 0-indexados
  const year = date.getFullYear().toString(); // Pega os últimos dois dígitos do ano

  return `${day}/${month}/${year}`;
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
}

const MovieInfo = ({ data }) => {
  const releaseDate = new Date(data.release);
  const formattedDate = formatDateToDDMMYY(releaseDate);

  const genres = data.genres.join(", ");
  const directors = data.directors.join(", ");
  const writers = data.writers.join(", ");
  const duration = formatDuration(data.runtime);

  return (
    <Box>
      <Typography variant="h4">{data.title}</Typography>
      <Box>
        <Typography
          display="inline"
          sx={{
            fontSize: ".75rem",
            color: (theme) => theme.palette.primary.light,
          }}
        >
          {formattedDate + " - "}
        </Typography>
        <Typography
          display="inline"
          sx={{
            fontSize: ".75rem",
            color: (theme) => theme.palette.primary.light,
          }}
        >
          {genres + " - "}
        </Typography>
        <Typography
          display="inline"
          sx={{
            fontSize: ".75rem",
            color: (theme) => theme.palette.primary.light,
          }}
        >
          {duration}
        </Typography>
      </Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <Typography variant="h6">Sinopse</Typography>
        <Typography
          sx={{
            fontSize: ".75rem",
            color: (theme) => theme.palette.primary.light,
          }}
        >
          {data.overview}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ marginTop: "1rem" }}>
        <Typography sx={{ fontSize: ".75rem", fontWeight: "bold" }}>Dirigido por:</Typography>
        <Typography
          sx={{
            fontSize: ".75rem",
            color: (theme) => theme.palette.primary.light,
          }}
        >
          {directors}
        </Typography>
        <Typography sx={{ fontSize: ".75rem", fontWeight: "bold" }}>Escrito por:</Typography>
        <Typography
          sx={{
            fontSize: ".75rem",
            color: (theme) => theme.palette.primary.light,
          }}
        >
          {writers}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieInfo;
