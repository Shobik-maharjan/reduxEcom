import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discoverMovieList } from "../redux/actions/movieActions";
import { Link } from "react-router-dom";

const Movie = () => {
  const imgUrl = import.meta.env.VITE_IMAGE_URL;
  const dispatch: any = useDispatch();

  const movieLists = useSelector((state: any) => state.movieList);

  useEffect(() => {
    dispatch(discoverMovieList());
  }, []);

  return (
    <>
      <div className="p-4">
        {/* <h2 className="text-2xl font-bold mb-6">MOVIES</h2> */}
        {movieLists && movieLists.discoverMovieList && (
          <div className="flex gap-2.5 flex-wrap justify-between">
            {movieLists.discoverMovieList.map((item: any, i: any) => (
              <Link
                to={`/movie/${movieLists.discoverMovieList[i].id}`}
                key={item.id}
              >
                <div className="mb-4 w-64">
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
      </div>
    </>
  );
};

export default Movie;
