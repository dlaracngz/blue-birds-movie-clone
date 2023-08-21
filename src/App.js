import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar";
import TrendingPage from "./pages/TrendingPage";
import UpComingPage from "./pages/UpcomingPage";
import FavoritesPage from "./pages/FavoritesPage";
import WatchListPage from "./pages/WatchListPage";
import SıgnUpPage from "./pages/SıgnUpPage";
import LogInPage from "./pages/LogInPage";
import GenresPage from "./pages/GenresPage";
import { SkeletonTheme } from "react-loading-skeleton";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <div className="App flex flex-col lg:flex-row w-full">
      <SideBar />
      <div className="lg:ml-[240px] w-full h-full">
        <SkeletonTheme>
          {/* Main Router */}
          <Routes>
            <Route path="/" element={<GenresPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/upcoming" element={<UpComingPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/watchList" element={<WatchListPage />} />
            <Route path="/signUp" element={<SıgnUpPage />} />
            <Route path="/logIn" element={<LogInPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default App;
