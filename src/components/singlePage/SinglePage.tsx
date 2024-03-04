import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SinglePage = () => {
  const movieId = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = import.meta.env.VITE_URL;
  const imgUrl = import.meta.env.VITE_IMAGE_URL;

  const [singleMovieData, setSingleMovieData] = useState<any>("");
  const fetchData = async () => {
    const singleMovieData = await axios.get(
      `${url}/${movieId.movieId}?api_key=${apiKey}`
    );
    setSingleMovieData(singleMovieData.data);
    // console.log(`${imgUrl}/${singleMovieData.sdata.poster_path}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div>
          <img
            src={`${imgUrl}/${singleMovieData.poster_path}`}
            alt=""
            className="w-4/12"
          />
        </div>
        <div className="title">{singleMovieData.title}</div>
      </div>
    </>
  );
};

export default SinglePage;
