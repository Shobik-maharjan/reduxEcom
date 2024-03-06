import Navbar from "../navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import SinglePage from "../singlePage/SinglePage";
import CategoryRoute from "./CategoryRoute";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/singlepage/:movieId" element={<SinglePage />} />
        <Route path="/*" element={<CategoryRoute />} />
      </Routes>
    </>
  );
};

export default Homepage;
