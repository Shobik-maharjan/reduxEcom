import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";
import { useEffect, useState } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLogout, setShowLogout] = useState<boolean>(false);

  const handleLogoutClick = () => {
    setShowLogout((prevState) => !prevState);
  };

  const user = useSelector((state: any) => state.userList);
  // const username = user.userList[0]?.username;
  const username = localStorage.getItem("userName");

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }
  }, [user]);

  const [scrolling, setScrolling] = useState(false);
  const handleScroll = () => {
    window.scrollY > 70 ? setScrolling(true) : setScrolling(false);
  };
  window.onscroll = handleScroll;

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const navbarStyle = {
    backgroundColor: scrolling ? "hsl(0,0%,0%,0.8)" : "black ",
  };
  return (
    <>
      <div className="sticky top-0 w-full">
        <div
          className="flex justify-around p-4 items-center"
          style={navbarStyle}
        >
          <div className="logo text-white">
            <Link to={"/"}>Rotten Tomatoess</Link>
          </div>
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
              <li className="px-2.5">
                <Link to={"/movies"}>Movies</Link>
              </li>
              <li className="px-2.5">
                <Link to={"/tv-shows"}>Tv&nbsp;Shows</Link>
              </li>
              <li className="px-2.5">
                <Link to={"/my-list"}>My&nbsp;List</Link>
              </li>
              <li className="px-2.5">
                <button onClick={handleLogoutClick}>{username}</button>
                {showLogout && (
                  <div className="absolute right-[2%] m-2 bg-white px-6 py-2">
                    <button
                      className="text-lg bg-emerald-500 hover:bg-emerald-600 p-2 rounded text-white"
                      onClick={() => dispatch<any>(logoutUser())}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
