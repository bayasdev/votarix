import { RowSelectionState, Updater } from '@tanstack/react-table';

import { columns } from '@/components/dashboard/elections/voters/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafeUser } from '@/types';

interface AddVotersClientProps {
  elegibleVoters: SafeUser[] | null;
  rowSelection: {};
  // eslint-disable-next-line no-unused-vars
  setRowSelection?: (updater: Updater<RowSelectionState>) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectedRowsChange?: (data: SafeUser[]) => void;
}

const AddVotersClient: React.FC<AddVotersClientProps> = ({
  elegibleVoters,
  rowSelection,
  setRowSelection,
  onSelectedRowsChange,
}) => {
  return (
    <DataTable
      columns={columns}
      data={elegibleVoters}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      onSelectedRowsChange={onSelectedRowsChange}
      showViewOptions={false}
      showRowSelection
    />
  );
};

export default AddVotersClient;
