import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";


const ReactTable = () => {

    const columnHelper = createColumnHelper()

    const data = [
        { id: 1, name: 'Alice', age: 25, city: 'New York' },
        { id: 2, name: 'Bob', age: 30, city: 'San Francisco' },
        { id: 3, name: 'Charlie', age: 35, city: 'Los Angeles' },
        { id: 4, name: 'David', age: 22, city: 'Chicago' },
        { id: 5, name: 'Eve', age: 28, city: 'Houston' },
        { id: 6, name: 'Frank', age: 40, city: 'Phoenix' },
        { id: 7, name: 'Grace', age: 32, city: 'Austin' },
        { id: 8, name: 'Henry', age: 29, city: 'Denver' },
        { id: 9, name: 'Ivy', age: 24, city: 'Miami' },
        { id: 10, name: 'Jack', age: 36, city: 'Seattle' },
        // Add more data as needed
    ]

    const columns = [
        columnHelper.accessor('id', {
            header: () => 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('name', {
            header: () => 'Name',
            cell: info => info.getValue()
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel,
    })


    return (
        <div>
            <h2>Table</h2>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {header.column.columnDef.header(header.getContext())}
                                            {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'dsc' ? ' 🔽' : ''}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {
                        table.getRowModel
                    }

                </tbody>


            </table>

        </div>
    );
};

export default ReactTable;