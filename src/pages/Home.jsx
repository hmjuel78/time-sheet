import { useEffect, useMemo, useState } from "react";
import BasicTable from "../components/basic-table/BasicTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, management } from "../features/auth/authSlice";
import DropdownWithSearch from "../components/dropdownWithSearch/DropdownWithSearch";

const Home = () => {
  const dispatch = useDispatch();
  const { managementDatas } = useSelector(authSelector);
  const [seclectedManagement, setSelectedManagement] = useState("");

  const data = useMemo(
    () => [
      { name: "Alice", age: 25, city: "New York" },
      { name: "Bob", age: 30, city: "San Francisco" },
      { name: "Charlie", age: 35, city: "Los Angeles" },
    ],
    []
  );

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("age", {
        header: () => "Age",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: () => "City",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  useEffect(() => {
    dispatch(management());
  }, []);

  return (
    <div>
      <div className="">
        <DropdownWithSearch
          _selectedData={seclectedManagement}
          _onSelectedData={setSelectedManagement}
          _datas={managementDatas}
          _mapKey="firstName"
        />
      </div>
      <h1>Home</h1>
      <BasicTable data={data} columns={columns} />
    </div>
  );
};

export default Home;
