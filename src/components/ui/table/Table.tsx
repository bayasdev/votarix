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

import Button from '../Button';

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
      {/* search */}
      <div className="flex justify-end">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Buscar..."
              className="input-bordered input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <span>
              <MdSearch size={20} />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-base-100">
          {/* head */}
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
          {/* body */}
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
      {/* pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-light">
          Página{' '}
          <span className="font-semibold">
            {table.getState().pagination.pageIndex + 1}
          </span>{' '}
          de {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <Button
            label="Anterior"
            icon={MdArrowBackIos}
            onClick={table.previousPage}
            color="ghost"
            disabled={!table.getCanPreviousPage()}
          />
          <Button
            label="Siguiente"
            icon={MdArrowForwardIos}
            onClick={table.nextPage}
            color="ghost"
            reverse
            disabled={!table.getCanNextPage()}
          />
        </div>
      </div>
    </div>
  );
}
