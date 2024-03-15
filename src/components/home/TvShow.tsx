import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discoverTvList, searchMovieList } from "../redux/actions/movieActions";
import { Link, useParams } from "react-router-dom";
import SearchAndFilter from "../searchAndFilter/SearchAndFilter";

const TvShow = () => {
  const imgUrl = import.meta.env.VITE_IMAGE_URL;
  const dispatch = useDispatch<any>();
  const [currentPage, setCurrentPage] = useState(1);

  const { discoverTvLists, loading, totalTvPage } = useSelector(
    (state: any) => state.movieList
  );

  const id = useParams();
  console.log(id);

  console.log(totalTvPage);

  useEffect(() => {
    dispatch(discoverTvList(currentPage));
  }, [currentPage]);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const getTotalPages = () => {
    return totalTvPage > 0 ? totalTvPage : 1;
  };

  const renderPageButtons = () => {
    const totalPages = getTotalPages();
    const buttons = [];
    const visiblePages = 5;
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
        onSearch={(query: any) => {
          dispatch(searchMovieList(query));
        }}
      />
      {loading ? (
        <div className={loading ? "display-loading" : ""}></div>
      ) : (
        <div className="p-4">
          {/* <h2 className="text-2xl font-bold mb-6">TV SHOWS</h2> */}
          {discoverTvLists && (
            <div className="flex gap-2.5 flex-wrap justify-between">
              {discoverTvLists.map((item: any, i: any) => (
                <Link to={`/tv/${discoverTvLists[i].id}`} key={item.id}>
                  <div className="mb-2 w-28 md:w-56">
                    <img
                      className=" flex rounded-md cursor-pointer hover:opacity-80"
                      src={`${imgUrl}/${item.poster_path}`}
                      alt={item.original_name}
                    />
                    <p>{item.original_name}</p>
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
            <span>{renderPageButtons()}</span>
            <button
              className="ml-2"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TvShow;
