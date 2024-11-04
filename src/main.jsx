import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import RootLayout from "./routes/rootLayout/RootLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Loader from "./components/loader/Loader.jsx";
import {
  PrivateRoute,
  PublicRoute,
} from "./routes/rootLayout/PrivateRoute.jsx";
import PrivateLayout from "./routes/rootLayout/PrivateLayout.jsx";
import Profile from "./pages/Profile.jsx";
import { injectStoreToAxios } from "./confiq/requestConfiq.js";

injectStoreToAxios(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />, // Default to home
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <Loader />
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> */}
    </StrictMode>
    <Toaster position="top-right" />
  </Provider>
);
