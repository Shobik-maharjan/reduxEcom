// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebaseConfig/config";
// import { addDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../redux/actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../redux/actions/userActions";

const Register = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [data, setData] = useState({
    userName: "",
    email: "",
    password1: "",
    confirmPassword: "",
  });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const { userList, message } = useSelector((state: any) => state.userList);
  // console.log("message", message);

  const { userName, email, password1, confirmPassword } = data;
  const validateUsername = () => {
    if (userName === "" || userName === null) {
      setError("Username is Required");
    } else {
      setError("");
    }
  };

  const validateEmail = () => {
    if (email === "" || email === null) {
      setError("Email is Required");
    } else {
      setError("");
    }
  };
  const validatePassword = () => {
    if (password1 === "" || password1 === null) {
      setError("Password is Required");
    } else if (password1.length < 6) {
      setError("password must be more then 6");
    } else {
      setError("");
    }
  };

  const checkPasswowrd = () => {
    if (confirmPassword.length < 6) {
      setError("password must be more then 6");
    }
    if (confirmPassword !== password1) {
      setError("password and confirm password doesnot match");
    } else {
      setPassword(password1);
      setError("");
    }
  };

  useEffect(() => {
    if (userList)
      if (localStorage.getItem("user") !== null) {
        navigate("/");
      } else {
        navigate("/register");
      }
  }, []);

  const validateCredential = (e: any) => {
    e.preventDefault();
    if (!email || !password1 || !userName || !confirmPassword) {
      return;
    }
    dispatch(
      registerUser({
        userName,
        email,
        password,
      })
    );
  };

  return (
    <>
      <div className="w-full bg-slate-200 h-screen pt-6">
        <form
          onSubmit={validateCredential}
          className="w-4/12 m-auto mt-20 bg-white rounded-sm p-4 border rounded-md"
        >
          <h2 className="mb-4 m-auto text-center font-bold text-2xl">
            REGISTER
          </h2>
          <div className="mb-2">
            <label htmlFor="userName" className="font-bold">
              Username:
            </label>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="userName"
              value={userName}
              onKeyUp={validateUsername}
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="font-bold">
              Email:
            </label>
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={email}
              onKeyUp={validateEmail}
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password1" className="font-bold">
              Password:
            </label>
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password1"
              value={password1}
              onKeyUp={validatePassword}
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="confirmPassword" className="font-bold">
              Confirm Password:
            </label>
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onKeyUp={checkPasswowrd}
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="error text-red-500">
            {message ? message.code : error}
          </div>

          <div className="m-auto flex justify-center mb-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              REGISTER
            </button>
          </div>

          <div className="forget-password">
            <Link to={"/forgot-password"} className="text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <div>
            Don't have account?
            <Link to="/login" className="text-blue-500">
              &nbsp;Login
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
