import { useEffect, useState } from "react";
import { useAuth } from "../context/UserAuthContext";
import { getFavoritesByUserDocId } from "../lib/firebase-lib";
import { fetchMovieById } from "../Api/MoviesApi";
import { emptyFilms } from "../constants/empty-objects";
import ListFilms from "../Components/ListFilms";

function FavoritesPage() {
  const [favorites, setFavorites] = useState({ results: [] });
  const [films, setFilms] = useState({ ...emptyFilms });
  const [activePage, setActivePage] = useState(1);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadFavorites();
  }, [currentUser, activePage]);

  const tempFavorites = [];

  const loadFavorites = async () => {
    if (!currentUser) return;
    const favorites = currentUser.favorites;
    for (let i = 0; i < favorites.length; i++) {
      const favoriteId = favorites[i];
      console.log(favorites[i]);
      const response = await fetchMovieById(favoriteId);
      const movie = await response.json();
      tempFavorites.push(movie);
    }
    setFavorites({ results: tempFavorites });
  };

  return (
    <div className="w-full h-screen">
      <h1 className="text-blue-300 bg-[#10141e] font-bold text-[40px] text-center p-8 select-none">
        Favorite Movies
      </h1>
      <ListFilms films={favorites} />
    </div>
  );
}

export default FavoritesPage;
