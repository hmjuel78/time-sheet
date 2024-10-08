import { Navigate } from "react-router-dom"
const token = localStorage.getItem("token")

export const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" replace />;
}