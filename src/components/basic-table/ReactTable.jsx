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
        { id: 10, name: 'Jack', age: 36, city: 'Seattle' }
    ]

    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 225,
            cell: info => info.getValue()
        },
        {
            accessorKey: 'name',
            header: 'Name',
            size: 225,
            cell: info => info.getValue()
        },
        {
            accessorKey: 'age',
            header: 'Age',
            size: 225,
            cell: info => info.getValue()
        },
        {
            accessorKey: 'city',
            header: 'City',
            size: 225,
            cell: info => info.getValue()
        }
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl mb-4">React Table</h2>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="min-w-16">
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {header.column.columnDef.header}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="min-w-16 text-center">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>


            </table>

        </div>
    );
};

export default ReactTable;