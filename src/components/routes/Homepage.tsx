import Navbar from "../navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import SinglePage from "../singlePage/SinglePage";
import Movie from "../home/Movie";
import TvShow from "../home/TvShow";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/singlepage/:movieId" element={<SinglePage />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/tv-shows" element={<TvShow />} />
      </Routes>
    </>
  );
};

export default Homepage;
