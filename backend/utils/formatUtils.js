function formatMovieData(movieData) {
  const formattedMovie = {
    id: movieData.id,
    title: movieData.title,
    overview: movieData.overview,
    release: movieData.release_date,
    rating: movieData.vote_average,
    posterPath: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
    runtime: movieData.runtime,
    voteCount: movieData.vote_count,
    genres: movieData.genres.map((genre) => genre.name),
    directors: [],
    writers: [],
  };

  movieData.credits.crew.forEach((member) => {
    if (member.job === "Director") {
      formattedMovie.directors.push(member.name);
    } else if (member.department === "Writing") {
      formattedMovie.writers.push(member.name);
    }
  });

  return formattedMovie;
}

exports.formatMovieData = formatMovieData;
