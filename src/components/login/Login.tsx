import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig/config";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.userList);

  console.log(user.userList);

  useEffect(() => {
    if (user.userList >= 1) {
      navigate("/");
    }
  }, []);

  // const submitBtn = async (e: any) => {
  //   e.preventDefault();
  //   const user = await signInWithEmailAndPassword(auth, email, password);
  //   dispatch(loginUser(email, password, user.user.uid));
  // };
  return (
    <>
      <div className="w-full bg-slate-200 h-screen pt-6">
        <form className="w-6/12 m-auto mt-36 bg-white rounded-sm p-4 border rounded-md">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="m-auto flex justify-center mb-2">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() =>
                dispatch<any>(loginUser({ email: email, password: password }))
              }
            >
              LOGIN
            </button>
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
