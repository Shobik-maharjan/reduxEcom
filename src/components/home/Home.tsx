import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  nowPlayingMovieList,
  popularMovieList,
  trendingMovieList,
  upComingMovieList,
} from "../redux/actions/movieActions";

const imgUrl = import.meta.env.VITE_IMAGE_URL;

const Home = () => {
  const dispatch: any = useDispatch();
  const movieLists = useSelector((state: any) => state.movieList);
  useEffect(() => {
    dispatch(nowPlayingMovieList());
    dispatch(trendingMovieList());
    dispatch(upComingMovieList());
    dispatch(popularMovieList());
  }, []);

  const Card = ({
    img,
    title,
    movieId,
  }: {
    img: any;
    title: any;
    movieId: any;
  }) => (
    <>
      <div className="min-w-60 mt-2 ">
        <Link to={`/movie/${movieId}`}>
          <img
            className="card cursor-pointer hover:opacity-80 rounded-xl"
            src={img}
            alt="cover"
          />
          <h2 className="hover:text-blue-800 w-fit">{title}</h2>
        </Link>
      </div>
    </>
  );

  const Row = ({ title, arr = [] }: { title: string; arr: any[] }) => (
    <div className="row w-full mt-4">
      <h2 className="pl-4 font-bold text-2xl">{title}</h2>

      <div className="w-full flex gap-2 overflow-x-scroll snap-x snap-mandatory px-4">
        {arr.map((item, index) => (
          <Card
            key={index}
            img={`${imgUrl}/${item.poster_path}`}
            title={`${item.original_title}`}
            movieId={`${item.id}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div
        className="banner bg-cover mb-5"
        style={{
          height: "80vh",
          objectFit: "cover",
          backgroundImage: movieLists.popularMovieList
            ? `url(${`${imgUrl}/${movieLists.popularMovieList[0].poster_path}`})`
            : "rgb(16,16,16);}",
        }}
      >
        <div className="movie-name pl-4 pt-[16%]">
          {movieLists.popularMovieList && (
            <>
              <h1 className="text-white text-6xl pb-4">
                {movieLists.popularMovieList[0].original_title}
              </h1>

              <p className="w-1/2 text-white">
                {movieLists.popularMovieList[0].overview}
              </p>

              <button
                type="button"
                className="bg-cyan-600 font-bold hover:opacity-95 rounded-xl px-4 py-2 mt-4"
              >
                <Link to={`/movie/${movieLists?.popularMovieList[0]?.id}`}>
                  Watch Now
                </Link>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="Movies List">
        <Row
          title={"Now Playing Movies"}
          arr={movieLists.nowPlayingMovieList}
        />
        <Row title={"Trending Movies"} arr={movieLists.trendingMovieList} />
        <Row title={"Upcoming Movies"} arr={movieLists.upcomingMovieList} />
        <Row title={"Popular Movies"} arr={movieLists.popularMovieList} />
      </div>

      <section className="Home"></section>
    </>
  );
};

export default Home;
