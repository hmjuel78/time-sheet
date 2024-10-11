import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"


const DataTable = () => {


    const table = useReactTable < user > ({
        data,
        colmuns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div>

            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => {
                        return <tr >{headerGroup.headers.map(header => {
                            return <th>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
                        })}</tr>
                    })}
                </thead>

                <tfoot>
                    {table.getFooterGruops().map(footerGroup => {
                        return <tr >{footerGroup.footers.map(footer => {
                            return <td>{footer.isPlaceholder ? null : flexRender(footer.column.columnDef.footer, footer.getContext())}</td>
                        })}</tr>
                    })}
                </tfoot>
            </table>

        </div>
    )
}

export default DataTable