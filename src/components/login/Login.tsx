import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, fail, message, userList } = useSelector(
    (state: any) => state.userList
  );

  useEffect(() => {
    if (fail) {
      setPassword("");
    }
  }, [fail]);

  const validateEmail = () => {
    if (email === "" || null) {
      setError("All Field Are Required");
    } else {
      setError("");
    }
  };

  const validatePassword = () => {
    if (password === "" || null) {
      setError("All Field Are Required");
    } else if (password.length < 6) {
      setError("password must be more than 6");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      // localStorage.setItem("user", user.userList[0].uid);
      navigate("/");
    }
    if (localStorage.getItem("user") !== null) {
      navigate("/");
    }
  }, [userList]);

  const validateCredential = (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch<any>(
      loginUser({
        email: email,
        password: password,
        loading,
      })
    );
  };

  return (
    <>
      <div className="w-full bg-slate-200 h-screen pt-6">
        <form
          onSubmit={validateCredential}
          className="w-4/12 m-auto mt-36 bg-white rounded-sm p-4 border rounded-md"
        >
          <h2 className="mb-4 m-auto text-center font-bold text-2xl">LOGIN</h2>
          <div className="mb-2">
            <label htmlFor="email" className="font-bold">
              Email:
            </label>
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              required
              onKeyUp={validateEmail}
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username" className="font-bold">
              Password:
            </label>
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              required
              value={password}
              onKeyUp={validatePassword}
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword(e.target.value)}
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
              LOGIN
            </button>
          </div>

          <div className="forget-password">
            <Link to={"/forgot-password"} className="text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <div>
            <span>
              Don't have account?
              <Link to="/register" className="text-blue-500">
                &nbsp;Register
              </Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
