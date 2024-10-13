import { useReactTable, getCoreRowModel, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

function BasicTable() {

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

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table style={{ border: '1px solid black' }}>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} style={{ padding: '10px', border: '1px solid black' }}>
                                {header.isPlaceholder ? null : header.column.columnDef.header()}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} style={{ padding: '10px', border: '1px solid black' }}>
                                {cell.column.columnDef.cell(cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BasicTable;
