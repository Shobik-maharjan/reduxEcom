import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";
import { useEffect, useState } from "react";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { FaDisplay } from "react-icons/fa6";
import { auth } from "../firebaseConfig/config";
import {
  discoverMovieList,
  discoverTvList,
  searchMovieList,
} from "../redux/actions/movieActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState<any>(false);

  const user = auth.currentUser;

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

  const navbarStyle = {
    backgroundColor: scrolling ? "hsl(0,0%,0%,0.9)" : "black ",
  };
  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    setShowMenu(false);
  };

  const handleMovieClick = () => {
    dispatch(discoverMovieList(1));
    handleLinkClick();
    setSearch("");
  };
  const handleTvLinkClick = () => {
    dispatch(discoverTvList(1));
    handleLinkClick();
    setSearch("");
  };

  const id = useParams();
  const { "*": value } = id;

  const handleSearch = (e: any) => {
    let searchQuery = e.target.value;
    setSearch(searchQuery);

    setTimeout(() => {
      dispatch(searchMovieList({ searchQuery: searchQuery, category: value }));
    }, 1000);
  };

  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="sticky top-0 w-full z-40 " style={navbarStyle}>
        <div className="flex md:flex-row justify-between  items-center p-4">
          <div
            className="logo text-white md:w-4/12 cursor-pointer text-2xl mr-4"
            onClick={handleLogoClick}
          >
            <Link to={"/"}>Movie&nbsp;App</Link>
          </div>
          <div className="search flex items-center my-2 w-full mr-2 md:w-11/12">
            <input
              type="search"
              name="search"
              value={search}
              className="w-full border rounded-3xl py-1.5 px-7"
              placeholder="search movies,TV shows,..."
              onChange={(e) => handleSearch(e)}
            />
            <CiSearch className="absolute ml-2 text-lg" />
          </div>

          <RxHamburgerMenu
            className="text-white text-5xl z-50 md:hidden"
            onClick={showMenuToggle}
          />
          {showMenu ? (
            <div className="absolute md:hidden category h-screen top-[85px] right-0 bg-black text-white w-4/12 md:w-6/12">
              <ul className="flex flex-col items-center justify-between text-left">
                <li className="p-0 md:px-2.5 py-2">
                  <Link
                    to={"/movie"}
                    className="flex items-center"
                    onClick={handleMovieClick}
                  >
                    <BiMoviePlay className="mr-2" /> Movies
                  </Link>
                </li>
                <li className="px-2.5 py-2">
                  <Link
                    to={"/tv"}
                    className="flex items-center"
                    onClick={handleTvLinkClick}
                  >
                    <FaDisplay className="mr-2" />
                    Tv&nbsp;Shows
                  </Link>
                </li>
                <li className="px-2.5 py-2">
                  <Link to={"/my-list"} onClick={handleLinkClick}>
                    My&nbsp;List
                  </Link>
                </li>
                <li className="px-2.5 relative">
                  {showMenu ? (
                    <div className="text-left">
                      <div className="flex mb-2 py-2 items-center hover:underline">
                        <FaUserTie className="mr-2" />
                        {user?.displayName}
                      </div>
                      <div className="account flex items-center mb-2 cursor-pointer hover:underline py-2">
                        <FaRegUser className="mr-2" />
                        Account
                      </div>
                      <div
                        className="flex items-center cursor-pointer hover:underline py-2"
                        onClick={() => dispatch(logoutUser())}
                      >
                        <IoLogOutOutline className="mr-2" />
                        Logout
                      </div>
                    </div>
                  ) : (
                    <>
                      <RxAvatar
                        className="text-2xl cursor-pointer transition-opacity duration-500 ease-in-out"
                        onMouseEnter={() => setShowLogout(true)}
                      />
                      {showLogout && (
                        <div
                          className={`absolute right-0 overflow-hidden w-fit bg-black/80 p-4 mt-6 min-w-32 cursor-pointer transition-opacity duration-500 ease-in-out opacity-0 ${
                            showLogout ? "opacity-100" : ""
                          }`}
                          onMouseEnter={() => setShowLogout(true)}
                          onMouseLeave={() => setShowLogout(false)}
                        >
                          <div>
                            <div className="flex mb-2 items-center hover:underline">
                              <FaUserTie className="mr-2" />
                              {user?.displayName}
                            </div>
                            <div className="account flex items-center mb-2 cursor-pointer hover:underline">
                              <FaRegUser className="mr-2" />
                              Account
                            </div>
                            <div
                              className="flex items-center cursor-pointer hover:underline"
                              onClick={() => dispatch(logoutUser())}
                            >
                              <IoLogOutOutline className="mr-2" />
                              Logout
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:block category text-white w-4/12 md:w-6/12">
              <ul className="flex items-center justify-between text-left">
                <li className="p-0 md:px-2.5 py-2">
                  <Link
                    to={"/movie"}
                    className="flex items-center"
                    onClick={handleMovieClick}
                  >
                    <BiMoviePlay className="mr-2" /> Movies
                  </Link>
                </li>
                <li className="px-2.5 py-2">
                  <Link
                    to={"/tv"}
                    className="flex items-center"
                    onClick={handleTvLinkClick}
                  >
                    <FaDisplay className="mr-2" />
                    Tv&nbsp;Shows
                  </Link>
                </li>
                <li className="px-2.5 py-2">
                  <Link to={"/my-list"} onClick={handleLinkClick}>
                    My&nbsp;List
                  </Link>
                </li>
                <li className="px-2.5 relative">
                  <RxAvatar
                    className="text-2xl cursor-pointer transition-opacity duration-500 ease-in-out"
                    onMouseEnter={() => setShowLogout(true)}
                  />
                  {showLogout && (
                    <div
                      className={`absolute right-0 overflow-hidden w-fit bg-black/80 p-4 mt-6 min-w-32 cursor-pointer transition-opacity duration-500 ease-in-out opacity-0 ${
                        showLogout ? "opacity-100" : ""
                      }`}
                      onMouseEnter={() => setShowLogout(true)}
                      onMouseLeave={() => setShowLogout(false)}
                    >
                      <div>
                        <div className="flex mb-2 items-center hover:underline">
                          <FaUserTie className="mr-2" />
                          {user?.displayName}
                        </div>
                        <div className="account flex items-center mb-2 cursor-pointer hover:underline">
                          <FaRegUser className="mr-2" />
                          Account
                        </div>
                        <div
                          className="flex items-center cursor-pointer hover:underline"
                          onClick={() => dispatch(logoutUser())}
                        >
                          <IoLogOutOutline className="mr-2" />
                          Logout
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
