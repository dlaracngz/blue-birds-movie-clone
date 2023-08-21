const getOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzI5ZTczOTk3ODM1YmQ2ZTIzNjkyMTdlOGYxMDJiMSIsInN1YiI6IjYzMmQ3MjM0YWJkYWZjMDA4MWE5NDViNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHWS0NPFARxPBs91PU1lnKjN9NUKz_tRTSjSEFP6eX4",
  },
};

export const fetchMovies = (movieId, pageNumber) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?certification=${movieId}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc'`,
    getOptions
  );
};

export const fetchMovieById = (movieId) => {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}`, getOptions);
};
