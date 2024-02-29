import { CiSearch } from "react-icons/ci";
const Navbar = () => {
  return (
    <>
      <div className="flex justify-around p-4 items-center bg-black">
        <div className="logo text-white">Rotten Tomatoess</div>
        <div className="search w-5/12">
          <input
            type="search"
            name="search"
            className="w-full border rounded-3xl py-1.5 px-7"
            placeholder="search movies,TV shows,..."
          />
          <CiSearch className="absolute top-7 ml-2 text-lg" />
        </div>

        <div className="category text-white">
          <ul className="flex items-center">
            <li className="px-2.5">Movies</li>
            <li className="px-2.5">Tv Shows</li>
            <li className="px-2.5">My List</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
