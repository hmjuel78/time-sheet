import { Link, Navigate, useNavigate } from "react-router-dom";
import { authSelector, logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/ui/uiSlice";
import toast from "react-hot-toast";

const Header = () => {
  const { token } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinks = (
    <>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      {token ? (
        <li>
          <p onClick={() => handleLogout()}>Logout</p>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const result = await dispatch(logout());
      dispatch(setLoading(false));
      //   navigate("/profile");
      window.location.reload();
      toast.success(result.payload.message);
    } catch (error) {}
  };

  return (
    <div className="navbar bg-base-100 justify-around">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl">
          TimeSheet
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <p onClick={() => handleLogout()}>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
