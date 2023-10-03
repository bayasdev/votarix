'use client';

import { useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getPaginationRowModel,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table';

import Search from './Search';
import TablePagination from './Pagination';

type TableProps<T> = {
  columns: ColumnDef<T, any>[];
  data: T[] | null;
  columnVisibility?: VisibilityState;
};

export default function Table<T>({
  columns,
  data,
  columnVisibility,
}: TableProps<T>) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
      columnVisibility: columnVisibility,
    },
    onGlobalFilterChange: setFilter,
  });

  useEffect(() => {
    if (columnVisibility) {
      table.setColumnVisibility(columnVisibility);
    }
  }, [columnVisibility, table]);

  return (
    <div className="flex flex-col gap-8">
      <Search value={filter} onChange={handleFilterChange} />
      <div className="overflow-x-auto">
        <table className="table bg-base-100">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        onPreviousPage={table.previousPage}
        onNextPage={table.nextPage}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
      />
    </div>
  );
}
