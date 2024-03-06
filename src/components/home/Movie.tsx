import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nowPlayingMovieList,
  popularMovieList,
} from "../redux/actions/movieActions";
import axios from "axios";
import { Link } from "react-router-dom";

const Movie = () => {
  const imgUrl = import.meta.env.VITE_IMAGE_URL;
  const dispatch: any = useDispatch();
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [movieGenre, setMovieGenre] = useState<any>();
  const [genre, setGenre] = useState<any>();

  const movieLists = useSelector((state: any) => state.movieList);
  const fetchData = async () => {
    const movieGenre = await axios.get(`${url}/genre/list?api_key=${apiKey}`);
    setMovieGenre(movieGenre.data.genres.map((item: any) => item.name));
    const tvListGenre = await axios.get(
      `${url}/genre/tv/list?api_key=${apiKey}`
    );
    setGenre(tvListGenre.data.genres.map((item: any) => item.name));
  };

  console.log(genre);

  useEffect(() => {
    dispatch(nowPlayingMovieList());
    dispatch(popularMovieList());
    fetchData();
  }, []);

  // console.log(movieLists);

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">MOVIES</h2>
        <div className="flex">
          <div className="mb-4 mr-2">
            <input
              type="search"
              name=""
              placeholder="search"
              id=""
              className="border-2 border-black rounded-md px-4 py-2"
            />
          </div>
          <div className="genre">
            <select
              name=""
              id=""
              className="border-2 border-black px-4 py-2 rounded-md"
            >
              {movieGenre &&
                movieGenre.map((item: any) => (
                  <option value="asd" key={item}>
                    {item}
                  </option>
                ))}
              {genre &&
                genre.map((item: any) => (
                  <option value="asd" key={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {movieLists &&
          movieLists.nowPlayingMovieList &&
          movieLists.popularMovieList && (
            <div className="flex gap-2.5 flex-wrap justify-between">
              {movieLists.nowPlayingMovieList.map((item: any, i: any) => (
                <Link
                  to={`/singlepage/${movieLists.nowPlayingMovieList[i].id}`}
                >
                  <div className="mb-4" key={item.id}>
                    <img
                      className="w-64 flex rounded-md cursor-pointer hover:opacity-80"
                      src={`${imgUrl}/${item.poster_path}`}
                      alt=""
                    />
                    <p>{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
      </div>
    </>
  );
};

export default Movie;
