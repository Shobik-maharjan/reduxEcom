import Navbar from "../navbar/Navbar";

const Home = () => {
  const apiKey = "a7af985e9cb8e846fdc1299ca862122c";
  const url = "https://api.themoviedb.org/3/movie";
  const fetchData = () => {};
  return (
    <>
      <Navbar />
      <div className="banner">
        <img
          src="https://www.shutterstock.com/image-vector/movie-film-banner-design-template-260nw-1106760434.jpg"
          alt=""
          className="w-full h-[80vh]"
        />
      </div>
      <div className="upcommingMovies">
        <h2>Upcomming Movies</h2>
        <div className="cart">
          <img
            src="https://www.shutterstock.com/image-vector/movie-film-banner-design-template-260nw-1106760434.jpg"
            alt=""
            className="w-3/12"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
