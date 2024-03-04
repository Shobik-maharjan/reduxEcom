import axios from "axios";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";

const apiKey = "a7af985e9cb8e846fdc1299ca862122c";
const url = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";

const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any>();
  const [upComingMovies, setUpComingMovies] = useState<any>();
  const [popularMovies, setPopularMovies] = useState<any>();

  const fetchNowPlayingMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`);
    console.log(results);
    setNowPlayingMovies(results);
  };

  const fetchUpCommingMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${url}/${upcoming}?api_key=${apiKey}`);
    setUpComingMovies(results);
  };

  const fetchPopularMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${url}/${popular}?api_key=${apiKey}`);
    setPopularMovies(results);
  };
  {
    // console.log(`${imgUrl}/${popularMovies}`);
  }
  useEffect(() => {
    fetchNowPlayingMovies();
    fetchUpCommingMovies();
    fetchPopularMovies();
  }, []);

  const Card = ({ img }: { img: any }) => (
    <img className="card" src={img} alt="cover" />
  );

  const Row = ({ title, arr = [] }: { title: string; arr: any[] }) => (
    <div className="row">
      <h2 className="pl-2 font-bold text-lg">{title}</h2>

      <div className="w-full flex overflow-x-scroll	gap-2">
        {arr.map((item, index) => (
          <>
            <div className="flex-row">
              <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
              {popularMovies && (
                <h1 className="pb-4">{popularMovies[index].original_title}</h1>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
  return (
    <>
      <Navbar />
      <div
        className="banner bg-cover	"
        style={{
          height: "80vh",
          objectFit: "cover",
          backgroundImage: popularMovies
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16,16,16);}",
        }}
      >
        <div className="movie-name p-14 pt-[25%]">
          {popularMovies && (
            <h1 className="text-white text-6xl pb-4">
              {popularMovies[0].original_title}
            </h1>
          )}
          {popularMovies && (
            <p className="w-1/2 text-white">{popularMovies[0].overview}</p>
          )}
        </div>
      </div>

      <div className="Movies List">
        <Row title={"Not Playing Movies"} arr={nowPlayingMovies} />
        <Row title={"Upcoming Movies"} arr={upComingMovies} />
        <Row title={"Popular Movies"} arr={popularMovies} />
      </div>

      <section className="Home"></section>
    </>
  );
};

export default Home;
