import Navbar from "../navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import SinglePage from "../singlePage/SinglePage";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/singlepage/:movieId" element={<SinglePage />} />
      </Routes>
    </>
  );
};

export default Homepage;
