import { useEffect, useState } from "react";
import fetchUpcoming from "../Api/UpcomingApi";
import ListFilms from "../Components/ListFilms";
import { emptyFilms } from "../constants/empty-objects";
import ReactPaginate from "react-paginate";

function UpcomingPage() {
  const [films, setFilms] = useState({ ...emptyFilms });
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    loadUpcomingFilms();
  }, [activePage]);

  const loadUpcomingFilms = async () => {
    const response = await fetchUpcoming(activePage);
    const data = await response.json();
    if (!response.ok) {
      const status = response.status;
      console.log("hata çıktı.");

      return;
    }
    setFilms(data);
  };
  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage((setActive) => setActive - 1);
    }
  };
  const handleNextPage = () => {
    setActivePage((setActive) => setActive + 1);
  };

  const handlePageClick = (data) => {
    console.log(data.selected);
    let activePage = data.selected + 1;
    setActivePage(activePage);
  };
  return (
    <>
      <h1 className="bg-[#10141e] text-[40px] font-bold text-blue-300 text-center select-none py-8">
        Upcoming Movies
      </h1>
      <ListFilms films={films} />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={500}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pageNumbers justify-content-center"}
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

export default UpcomingPage;
