const pageUpcomingNumber = 1;

const getOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzI5ZTczOTk3ODM1YmQ2ZTIzNjkyMTdlOGYxMDJiMSIsInN1YiI6IjYzMmQ3MjM0YWJkYWZjMDA4MWE5NDViNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHWS0NPFARxPBs91PU1lnKjN9NUKz_tRTSjSEFP6eX4",
  },
};

const fetchUpcoming = (pageUpcomingNumber) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=837ddd7bf3645dab7c2e0b4d81c44b22&language=en-US&page=${pageUpcomingNumber}`,
    getOptions
  );
};
export default fetchUpcoming;
