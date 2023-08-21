import fetchDetails from "../Api/DetailsApi";
import fetchRecommendations from "../Api/RecommendationsApi";
import fetchCharacters from "../Api/CharactersApi";
import { useEffect, useState } from "react";
import { emptyFilms } from "../constants/empty-objects";
import { useParams } from "react-router-dom";
import ListFilms from "../Components/ListFilms";
import { Scrollbar } from "react-scrollbars-custom";

function DetailsPage() {
  const params = useParams();
  const [film, setFilm] = useState([{ ...emptyFilms }]);
  const [films, setFilms] = useState([{ ...emptyFilms }]);
  const [characters, setCharacters] = useState([{ ...emptyFilms }]);
  const posterPath =
    "https://image.tmdb.org/t/p/original/" + film.backdrop_path;

  useEffect(() => {
    loadDetails(params.id);
    loadRecommendations(params.id);
    loadCharacters(params.id);
  }, [params]);

  const loadDetails = async (movieId) => {
    const response = await fetchDetails(movieId);
    const data = await response.json();
    setFilm(data);
  };

  const loadRecommendations = async (movieId) => {
    const response = await fetchRecommendations(movieId);
    const data = await response.json();
    setFilms(data);
    console.log(data.results);
  };

  const loadCharacters = async (movieId) => {
    const response = await fetchCharacters(movieId);
    console.log(response);
    const data = await response.json();
    setCharacters(data);
    console.log(data);
  };

  const listCategories = film.genres?.map((genre) => (
    <li
      key={genre.id}
      className="p-3 text-[18px] font-semibold rounded-full m-2 bg-gray-800"
    >
      {genre.name}
    </li>
  ));
  const listCast = characters.cast?.map((character) => (
    <div
      key={character.id}
      className="flex min-w-[9rem] md:min-w-[10rem] ma-w-[9rem] md:max-w-[10rem] h-full items-center flex-col mx-1"
    >
      <img
        src={
          character.profile_path == null
            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/User-Pict-Profil.svg/1200px-User-Pict-Profil.svg.png"
            : "https://image.tmdb.org/t/p/w500" + character.profile_path
        }
        className="rounded-lg h-[240px]"
      />
      <div className="text-white text-center">{character.name}</div>
      <div className="text-blue-300 text-center">
        {"(" + character.character + ")"}
      </div>
    </div>
  ));
  return (
    <div className="bg-[#10141e] w-full h-full select-none">
      <div>
        <div className="relative">
          <img src={posterPath} alt="" className="w-full" />
          <h1
            id="filmOriginalTitle"
            className="absolute bottom-0 text-white text-center w-full text-2xl md:text-6xl font-bold p-10"
          >
            {film.original_title}
          </h1>
        </div>
      </div>
      <h1
        id="film-overview"
        className="text-center font-semibold px-24 text-white text-[18px] py-6"
      >
        {film.overview}
      </h1>
      <div className="w-full text-center p-2">
        <button className="border-2 bg-blue-600/30 font-semibold rounded-full p-3 text-white">
          Release Date : {film.release_date}
        </button>
      </div>
      <div className="text-white flex flex-wrap justify-center items-center">
        <ul
          id="listCategories"
          className="flex flex-wrap justify-center px-6 pt-4"
        >
          {listCategories}
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl text-blue-300 text-center font-semibold p-2">
          Cast
        </h1>
        <div
          id="listCast"
          className="md:px-5 flex flex-row my-5 w-[1500px] overflow-x-auto relative  md:pb-3"
        >
          {listCast}
        </div>
      </div>
      <div className="py-2">
        <h1
          id="recommentedFilms"
          className="text-blue-300 text-[40px] text-center font-bold"
        >
          Recommented Films
        </h1>
        <div className="py-6">
          <ListFilms films={films} />
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
