import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    createColumnHelper,
} from '@tanstack/react-table';

function BasicTable() {
    const data = React.useMemo(
        () => [
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
        ],
        []
    );

    const columnHelper = createColumnHelper();

    const columns = React.useMemo(
        () => [
            columnHelper.accessor('id', {
                header: () => 'ID',
                cell: info => info.getValue(),
            }),
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

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: 5 }, // Default rows per page
        },
    });

    return (
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    style={{
                                        padding: '8px',
                                        border: '1px solid black',
                                        backgroundColor: '#f0f0f0',
                                    }}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {header.column.columnDef.header(header.getContext())}
                                            {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
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
                                <td
                                    key={cell.id}
                                    style={{
                                        padding: '8px',
                                        border: '1px solid black',
                                    }}
                                >
                                    {cell.column.columnDef.cell(cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </button>
                    <span style={{ margin: '0 10px' }}>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>

                <div>
                    <label>
                        Rows per page:
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => table.setPageSize(Number(e.target.value))}
                            style={{ marginLeft: '8px' }}
                        >
                            {[5, 10, 15, 20].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default BasicTable;
