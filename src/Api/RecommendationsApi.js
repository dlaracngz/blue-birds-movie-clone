const getOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzI5ZTczOTk3ODM1YmQ2ZTIzNjkyMTdlOGYxMDJiMSIsInN1YiI6IjYzMmQ3MjM0YWJkYWZjMDA4MWE5NDViNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHWS0NPFARxPBs91PU1lnKjN9NUKz_tRTSjSEFP6eX4",
  },
};

const fetchRecommendations = async (movieId) => {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
    getOptions
  );
};

export default fetchRecommendations;
