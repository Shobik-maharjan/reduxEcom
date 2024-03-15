import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchAndFilter = ({ onSearch }: { onSearch: any }) => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const categoryTitle = useParams<string>();
  const title = categoryTitle["*"];
  //   console.log(title);

  const id = useParams();
  const { "*": value } = id;
  const category = value;

  const [movieGenre, setMovieGenre] = useState<any>();
  const [genre, setGenre] = useState<any>();
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    const movieGenre = await axios.get(`${url}/genre/list?api_key=${apiKey}`);
    setMovieGenre(movieGenre.data.genres.map((item: any) => item.name));
    const tvListGenre = await axios.get(
      `${url}/genre/tv/list?api_key=${apiKey}`
    );
    setGenre(tvListGenre.data.genres.map((item: any) => item.name));
  };
  const handleSearch = (e: any) => {
    const searchQuery = e.target.value;

    setQuery(searchQuery);
    onSearch({ query: searchQuery, category: category }); // Dispatch search action with query
    // cate(value);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="px-4 pt-6">
        <h2 className="text-2xl font-bold mb-6 uppercase">
          {title === "tv" ? "Tv-shows" : title}
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 mr-2">
            <input
              type="search"
              name="search"
              placeholder="search"
              value={query}
              onChange={(e) => {
                handleSearch(e);
              }}
              className="border-2 border-black rounded-md px-4 py-2"
            />
          </div>
          <div className="genre">
            <select
              name=""
              id=""
              className="border-2 border-black px-4 py-2.5 rounded-md cursor-pointer"
            >
              {movieGenre &&
                movieGenre.map((item: any) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              {genre &&
                genre.map((item: any) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilter;
