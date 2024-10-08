import { Outlet } from "react-router-dom"
import Header from "../../components/header/Header"

export default function PrivateLayout() {

    return (
        <>
            <Header />
            <div id="detail">
                <Outlet />
            </div>
        </>
    )
}