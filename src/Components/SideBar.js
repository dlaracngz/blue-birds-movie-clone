import { useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { useAuth } from "../context/UserAuthContext";

function SideBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, isLoggedIn } = useAuth();

  const genresBtnClassName = classNames("genres-button", {
    active: location.pathname.includes("genres"),
  });
  const trendingBtnClassName = classNames("sidebar-button", {
    active: location.pathname.includes("trending"),
  });
  const upcomingBtnClassName = classNames("sidebar-button", {
    active: location.pathname.includes("upcoming"),
  });
  const favoritesBtnClassName = classNames("sidebar-button", {
    active: location.pathname.includes("favorites"),
  });
  const signUpBtnClassName = classNames("sidebar-button", {
    active: location.pathname.includes("signUp"),
  });
  const logInBtnClassName = classNames("sidebar-button", {
    active: location.pathname.includes("logIn"),
  });
  const SignOutBtnClassName = classNames("sidebar-button", {
    active: location.pathname.includes("SignOut"),
  });

  const handleSignOut = () => {
    logout();
  };

  return (
    <div
      id="sideBar"
      className="bg-black w-full lg:w-[240px] lg:h-screen select-none cursor-pointer lg:fixed"
    >
      <div id="logo">
        <div className="flex justify-center">
          <img
            id="logoPicture"
            src="logo.png"
            alt=""
            className="w-24 pt-6 pb-2"
          />
        </div>
        <h1
          id="sideBarTitle"
          className="font-bold text-[24px] text-gray-500 text-center mb-4"
        >
          BlueBird Movies
        </h1>
      </div>
      <div id="menu">
        <i
          id="bars"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className={menuOpen ? "fas fa-times" : "fas fa-bars"}
        ></i>
      </div>
      <ul className={menuOpen ? "open" : " "}>
        <li>
          <Link to={"/genres"} className="w-full">
            <button key={1} id="1" className={genresBtnClassName}>
              Genres
            </button>
          </Link>
        </li>
        <li>
          <Link to={"/trending"}>
            <button key={2} id="2" className={trendingBtnClassName}>
              Trending
            </button>
          </Link>
        </li>
        <li>
          <Link to={"/upcoming"}>
            <button key={3} id="3" className={upcomingBtnClassName}>
              Upcoming
            </button>
          </Link>
        </li>
        <li>
          <Link to={"/favorites"}>
            <button key={4} id="4" className={favoritesBtnClassName}>
              Favorites
            </button>
          </Link>
        </li>
        <li>
          {!isLoggedIn && (
            <Link to={"/signUp"}>
              <button key={5} id="5" className={signUpBtnClassName}>
                Sign up
              </button>
            </Link>
          )}
        </li>
        <li>
          {!isLoggedIn && (
            <Link to={"/logIn"}>
              <button key={6} id="6" className={logInBtnClassName}>
                Log in
              </button>
            </Link>
          )}
        </li>
        <li>
          {isLoggedIn && (
            <button
              key={7}
              id="7"
              className={SignOutBtnClassName}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
