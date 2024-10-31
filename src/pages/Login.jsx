import { useDispatch } from "react-redux";
import { userLogin } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../features/ui/uiSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      if (!user.username) {
        return toast.error("Please input your name");
      }
      if (!user.password) {
        return toast.error("Please input your password");
      }
      dispatch(setLoading(true));
      const result = await dispatch(userLogin(user)).unwrap();
      console.log(result);

      //   if (result.status === "success") {
      //     toast.success("Login success!!!");
      //     navigate("/home");
      //     dispatch(setLoading(false));
      //   }
    } catch (error) {
      console.log("h");
      toast.error(error.message);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <h1 className="text-4xl my-4">Login page</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Username/email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="******"
          />
        </label>

        <button type="submit" className={`btn btn-success w-full text-white`}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
