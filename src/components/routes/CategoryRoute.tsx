import { Route, Routes } from "react-router-dom";
import Movie from "../home/Movie";
import TvShow from "../home/TvShow";
// import SearchAndFilter from "../searchAndFilter/SearchAndFilter";
import MyList from "../home/MyList";

const CategoryRoute = () => {
  return (
    <>
      {/* <SearchAndFilter /> */}
      <Routes>
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<TvShow />} />
        <Route path="/my-list" element={<MyList />} />
      </Routes>
    </>
  );
};

export default CategoryRoute;
