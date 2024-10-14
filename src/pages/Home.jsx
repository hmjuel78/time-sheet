import { useMemo } from "react";
import BasicTable from "../components/basic-table/BasicTable"
import { createColumnHelper } from "@tanstack/react-table";

const Home = () => {

    const data = useMemo(
        () => [
            { name: 'Alice', age: 25, city: 'New York' },
            { name: 'Bob', age: 30, city: 'San Francisco' },
            { name: 'Charlie', age: 35, city: 'Los Angeles' },
        ],
        []
    );

    const columnHelper = createColumnHelper();

    const columns = useMemo(
        () => [
            columnHelper.accessor('name', {
                header: () => 'Name',
                cell: info => info.getValue(),
            }),
            columnHelper.accessor('age', {
                header: () => 'Age',
                cell: info => info.getValue(),
            }),
            columnHelper.accessor('city', {
                header: () => 'City',
                cell: info => info.getValue(),
            }),
        ],
        []
    );


    return (
        <div>
            <h1>Home</h1>
            <BasicTable
                data={data}
                columns={columns}
            />
        </div>
    )
}

export default Home