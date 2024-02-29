import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-full bg-slate-200 h-screen pt-6">
        <form className="w-6/12 m-auto mt-36 bg-white rounded-sm p-4 border rounded-md">
          <h2 className="mb-4 m-auto text-center font-bold text-2xl">LOGIN</h2>
          <div className="mb-2">
            <label htmlFor="username" className="font-bold">
              Username:
            </label>
          </div>
          <div className="mb-4">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline" />
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
            />
          </div>

          <div className="m-auto flex justify-center mb-2">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
      </div>
    </>
  );
};

export default Login;
