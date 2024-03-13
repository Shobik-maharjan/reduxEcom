import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";
import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { FaDisplay } from "react-icons/fa6";
import { auth } from "../firebaseConfig/config";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLogout, setShowLogout] = useState<boolean>(false);

  // const handleLogoutClick = () => {
  //   setShowLogout((prevState) => !prevState);
  // };

  const user = auth.currentUser;
  // console.log(user);

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
    backgroundColor: scrolling ? "hsl(0,0%,0%,0.8)" : "black ",
  };
  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="sticky top-0 w-full z-40 " style={navbarStyle}>
        <div className="flex justify-between  items-center p-4">
          <div
            className="logo text-white cursor-pointer text-2xl"
            onClick={handleLogoClick}
          >
            Rotten Tomatoes
          </div>
          <div className="search flex items-center w-5/12">
            <input
              type="search"
              name="search"
              className="w-full border rounded-3xl py-1.5 px-7"
              placeholder="search movies,TV shows,..."
            />
            <CiSearch className="absolute ml-2 text-lg" />
          </div>

          <div className="category text-white">
            <ul className="flex items-center">
              <li className="px-2.5">
                <Link
                  to={"/movies"}
                  className="flex items-center"
                  onClick={handleLinkClick}
                >
                  <BiMoviePlay className="mr-2" /> Movies
                </Link>
              </li>
              <li className="px-2.5">
                <Link
                  to={"/tv-shows"}
                  className="flex items-center"
                  onClick={handleLinkClick}
                >
                  <FaDisplay className="mr-2" />
                  Tv&nbsp;Shows
                </Link>
              </li>
              <li className="px-2.5">
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
                        onClick={() => dispatch<any>(logoutUser())}
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
