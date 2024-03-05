import { useSelector } from "react-redux";

const Movie = () => {
  const imgUrl = import.meta.env.VITE_IMAGE_URL;

  const movieLists = useSelector((state: any) => state.movieList);
  console.log(movieLists.nowPlayingmMovieList.map((item: any) => item.title));

  return (
    <>
      <div>
        <div>
          {movieLists.nowPlayingmMovieList.map((item: any) => (
            <img
              className="w-1/12 flex"
              src={`${imgUrl}/${item.poster_path}`}
              alt=""
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Movie;
