import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  discoverMovieList,
  searchMovieList,
} from "../redux/actions/movieActions";
import { Link } from "react-router-dom";
import SearchAndFilter from "../searchAndFilter/SearchAndFilter";

const Movie = () => {
  const imgUrl = import.meta.env.VITE_IMAGE_URL;
  const dispatch: any = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { discoverMovieLists, totalMoviePage, loading, searchResults } =
    useSelector((state: any) => state.movieList);

  useEffect(() => {
    dispatch(discoverMovieList(currentPage));
    dispatch(searchMovieList({ query: "" }));
  }, [currentPage]);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const getTotalPages = () => {
    return totalMoviePage > 0 ? totalMoviePage : 1;
  };

  const renderPageButtons = () => {
    const totalPages = getTotalPages();
    const buttons = [];

    const visiblePages = 5; // You can adjust this number as needed
    const halfVisiblePages = Math.floor(visiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            currentPage === i
              ? "bg-black text-white rounded-full px-2"
              : "" + "px-2 "
          }
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <>
      <SearchAndFilter
        onSearch={(query: any) => dispatch(searchMovieList({ query }))}
      />
      {loading ? (
        <div className={loading ? "display-loading" : ""}></div>
      ) : (
        <div className="p-4">
          {/* <h2 className="text-2xl font-bold mb-6">MOVIES</h2> */}
          {searchResults && searchResults.length > 0
            ? searchResults && (
                <div className="flex gap-2.5 flex-wrap justify-between">
                  {searchResults.map((item: any) => (
                    <Link to={`/movie/${item.id}`} key={item.id}>
                      <div className="mb-4 w-28 md:w-56">
                        <img
                          className="flex rounded-md cursor-pointer hover:opacity-80"
                          src={`${imgUrl}/${item.poster_path}`}
                          alt=""
                        />
                        <p>{item.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            : discoverMovieLists && (
                <div className="flex gap-2.5 flex-wrap justify-between">
                  {discoverMovieLists.map((item: any) => (
                    <Link to={`/movie/${item.id}`} key={item.id}>
                      <div className="mb-4 w-28 md:w-56">
                        <img
                          className="flex rounded-md cursor-pointer hover:opacity-80"
                          src={`${imgUrl}/${item.poster_path}`}
                          alt=""
                        />
                        <p>{item.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
          <div className="pagination-container flex justify-center">
            <button
              className="mr-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="">{renderPageButtons()}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="ml-2"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
