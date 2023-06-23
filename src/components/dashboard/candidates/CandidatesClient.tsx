'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { MdOutlineAdd } from 'react-icons/md';

import { SafeCandidate } from '@/src/types';
import Button from '../../ui/Button';
import Heading from '../../ui/Heading';
import Table from '../../ui/table/Table';
import TableActions from '../../ui/table/TableActions';

interface CandidatesClientProps {
  candidates: SafeCandidate[] | null;
}

const CandidatesClient: React.FC<CandidatesClientProps> = ({ candidates }) => {
  const columnHelper = createColumnHelper<SafeCandidate>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Nombre',
    }),
    columnHelper.accessor('document', {
      header: () => 'Cédula',
    }),
    columnHelper.accessor('email', {
      header: () => 'Correo electrónico',
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: () => 'Acciones',
      cell: (props) => (
        <TableActions id={props.getValue()} model="candidates" />
      ),
    }),
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading title="Candidatos" subtitle="Administrar candidatos" />
        <Button label="Agregar" onClick={() => {}} icon={MdOutlineAdd} />
      </div>
      <Table columns={columns} data={candidates} />
    </div>
  );
};

export default CandidatesClient;
