import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

function Film({ film }) {
  const posterPath = "https://image.tmdb.org/t/p/w500" + film.poster_path;
  const { currentUser, addFavorites, removeFavorite } = useAuth();
  const navigate = useNavigate();

  const handleAddFavorites = async (filmId) => {
    if (!currentUser) {
      navigate("/logIn", { replace: false });
      return;
    }
    const { userDocId } = currentUser;
    addFavorites(userDocId, filmId);
  };

  const handleRemoveFavorite = async (filmId) => {
    const { userDocId } = currentUser;
    removeFavorite(userDocId, filmId);
  };

  return (
    <div className="select-none div-area">
      <div className="relative">
        <Link to={"/details/" + film?.id}>
          <img
            src={
              film.poster_path == null
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsUB7IkUwO96WpFcNaHoy60BdByJ4LDGg4QXwOVZhTUR4XVVW8IANAVnisNfa3e5KGos4&usqp=CAU"
                : posterPath
            }
            alt=""
            className="rounded-lg"
          />
        </Link>
        <div className="flex justify-between w-full items-end absolute bottom-0 text-[20px] z-20 shadowx">
          <h1 className="text-white font-bold m-4">{film.original_title}</h1>
          <p className="text-green-500 font-bold w-12 h-12 bg-zinc-900 p-2 m-2 rounded-full">
            {film.vote_average.toFixed(1)}
          </p>
        </div>
        <div className="absolute top-0 right-0 z-10">
          {!currentUser?.favorites.includes(film.id) && (
            <div
              className="tooltip"
              onClick={() => {
                handleAddFavorites(film.id);
              }}
            >
              <AiOutlineStar className="m-2 text-white bg-black w-10 h-10 p-2 rounded-full"></AiOutlineStar>
              <div className="top">
                <h3>Add Favorites</h3>
              </div>
            </div>
          )}

          {currentUser?.favorites.includes(film.id) && (
            <div
              className="tooltip"
              onClick={() => {
                handleRemoveFavorite(film.id);
              }}
            >
              <AiFillStar className="m-2 text-white bg-black w-10 h-10 p-2 rounded-full"></AiFillStar>
              <div className="top">
                <h3>Delete Favorites</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Film;
