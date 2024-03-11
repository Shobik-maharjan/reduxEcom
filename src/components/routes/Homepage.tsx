import Navbar from "../navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import SinglePage from "../singlePage/SinglePage";
import CategoryRoute from "./CategoryRoute";
import Footer from "../footer/Footer";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movie/:movieId" element={<SinglePage />} />
        <Route path="/tv/:movieId" element={<SinglePage />} />
        <Route path="/*" element={<CategoryRoute />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Homepage;
