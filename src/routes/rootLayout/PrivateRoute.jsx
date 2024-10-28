import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { authSelector } from './../../features/auth/authSlice';
import PrivateLayout from "./PrivateLayout";

export const PrivateRoute = ({ children }) => {
    const { token } = useSelector(authSelector)

    if (!token) {
        return <Navigate to="/login" />
    }
    return <PrivateLayout />
}