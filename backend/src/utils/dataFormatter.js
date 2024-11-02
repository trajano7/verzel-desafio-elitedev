function movieDataFormatter(movieData) {
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

function movieListFormatter(movies) {
  return movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    release: movie.release_date,
    rating: movie.vote_average,
    posterURL: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
  }));
}

function favoriteListFormatter(favorites) {
  return favorites.map((movie) => {
    return {
      id: movie.movie_id,
      title: movie.title,
      release: movie.release_date,
      rating: movie.rating,
      posterURL: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    };
  });
}


module.exports = {
  movieDataFormatter,
  movieListFormatter,
  favoriteListFormatter,
};
