'use client';

import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { MdSearch, MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import Button from '../ui/Button';
import TableSearch from './TableSearch';
import TablePagination from './TablePagination';

type TableProps<T> = {
  columns: ColumnDef<T, any>[];
  data: T[] | null;
};

export default function Table<T>({ columns, data }: TableProps<T>) {
  const [filter, setFilter] = useState('');

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
  });

  return (
    <div className="flex flex-col gap-8">
      <TableSearch value={filter} onChange={setFilter} />
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
