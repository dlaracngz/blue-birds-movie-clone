import { useEffect, useState } from "react";
import ListFilms from "../Components/ListFilms";
import ListCategories from "../Components/ListCategories";
import fetchGenres from "../Api/genresApi";
import fetchCategories from "../Api/Categories";
import Content from "../Components/Content";
import { emptyFilms } from "../constants/empty-objects";
import fetchSearchFilm from "../Api/SearchApi";
import CardSkeleton from "../Components/CardSkeleton";
import ReactPaginate from "react-paginate";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";

export default function () {
  const [films, setFilms] = useState({ ...emptyFilms });
  const [activePage, setActivePage] = useState(1);
  const [genreId, setGenreID] = useState(28);
  const [categories, setCategories] = useState(null);
  const [search, setSearch] = useSearchParams();
  const filmSearch = search.get("film");
  const [totalPage, setTotalPage] = useState(500);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadSearch();
  }, [search, activePage, genreId]);

  const loadCategories = async () => {
    const _categories = await fetchCategories();
    console.log(_categories);
    if (_categories?.genres?.length) setCategories(_categories.genres);
  };
  const loadSearch = async () => {
    const data = await fetchSearchFilm(activePage, genreId, filmSearch);
    setFilms(data);
    const { total_pages } = data;
    if (!filmSearch) setTotalPage(500);
    else setTotalPage(total_pages);
  };
  const loadCategory = async (genreId, activePage) => {
    const response = await fetchGenres(genreId, activePage);
    const data = await response.json();
    setFilms(data);
  };

  const handleNextPage = async () => {
    setActivePage((prevState) => prevState + 1);
    console.log(activePage);
  };

  const handlePrevPage = async () => {
    if (activePage > 1) setActivePage((prevState) => prevState - 1);
    console.log(activePage);
  };

  const handlePageClick = (data) => {
    console.log(data.selected);
    let activePage = data.selected + 1;
    setActivePage(activePage);
  };
  return (
    <>
      <Content onCreate={loadSearch} />
      <ListCategories
        genreId={genreId}
        setGenreID={setGenreID}
        categories={categories}
        onCreateCategory={loadCategory}
      />
      <h1 className="bg-[#10141e] text-[40px] font-bold text-blue-300 text-center select-none pb-8 pt-6">
        Genres
      </h1>
      {/* <div>
        {isLoading && <p className="text-white bg-[#10141e]">Loading...</p>}
        {isLoading && <CardSkeleton cards={20} />}
      </div> */}
      <ListFilms films={films} />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pageNumbers"}
        pageClassName={"pageNumbers-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"pageNumbers-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"pageNumbers-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"pageNumbers-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"pageNumbers-active"}
      />
      <div className="tekliPageNumber">
        <button
          onClick={handlePrevPage}
          className="bg-white font-bold p-2 rounded-full text-[20px] w-24 select-none"
        >
          Back
        </button>
        <button className="text-white bg-gray-800 w-12 h-12 rounded-full mx-2 select-none">
          {activePage}
        </button>
        <button
          onClick={handleNextPage}
          className="bg-white font-bold p-2 rounded-full text-[20px] w-24 select-none"
        >
          Next
        </button>
      </div>
    </>
  );
}
