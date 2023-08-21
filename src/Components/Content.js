import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../context/UserAuthContext";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

function Content({ onCreate }) {
  //const [film, setFilm] = useState("");
  const { currentUser, isLoggedIn } = useAuth();
  const [search, setSearch] = useSearchParams();
  const filmSearch = search.get("film");

  useEffect(() => {
    if (!isLoggedIn) return;
  }, [isLoggedIn]);

  const handleChange = (event) => {
    setSearch((prevState) => ({ ...prevState, film: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!filmSearch) {
      onCreate("");
      return;
    }
    onCreate(filmSearch);
  };

  const handleCross = (event) => {
    event.preventDefault();
    setSearch("");
  };
  return (
    <>
      <div className="flex justify-end items-center gap-x-2 bg-gradient-to-r from-fuchsia-600 to-cyan-700 w-full">
        {isLoggedIn && (
          <div className="flex items-center justify-center">
            <BsPersonCircle className="text-white w-8 h-8"></BsPersonCircle>
            <div className="text-white select-none ">{currentUser.email}</div>
          </div>
        )}
      </div>
      <div className="bg-gradient-to-r from-fuchsia-600 to-cyan-700 w-full h-[8rem] flex justify-center items-center select-none">
        <form onSubmit={handleSubmit} className="relative">
          <input
            id="searchBar"
            type="text"
            placeholder="Search movie"
            className="border-none md:w-[400px] lg:w-[700px] p-[12px] rounded-xl outline-none"
            value={filmSearch}
            onChange={handleChange}
          />
          <RxCross1
            onClick={handleCross}
            className="absolute top-0 right-0 w-6 h-6 mx-2 my-3 cursor-pointer"
          ></RxCross1>
        </form>
      </div>
    </>
  );
}

export default Content;
