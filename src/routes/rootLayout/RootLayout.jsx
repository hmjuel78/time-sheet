import { Outlet } from "react-router-dom"
import RowTable from "../../components/basic-table/RowTable"


export default function RootLayout() {

  return (
    <>
      <h1>Root layout</h1>
      <RowTable />
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}