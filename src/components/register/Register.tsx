// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebaseConfig/config";
// import { addDoc, collection } from "firebase/firestore";
import { useDispatch } from "react-redux";
// import { registerUser } from "../redux/actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../redux/actions/userActions";

const Register = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const { userName, email, password } = data;
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="w-full bg-slate-200 h-screen pt-6">
        <form className="w-6/12 m-auto mt-20 bg-white rounded-sm p-4 border rounded-md">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="font-bold">
              Password:
            </label>
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="font-bold">
              Confirm Password:
            </label>
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="m-auto flex justify-center mb-2">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() =>
                dispatch(
                  registerUser({
                    userName,
                    email,
                    password,
                  })
                )
              }
            >
              REGISTER
            </button>
          </div>
          <div>
            Don't have account?
            <Link to="/login" className="text-blue-500">
              &nbsp;login
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
