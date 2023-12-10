import { RowSelectionState, Updater } from '@tanstack/react-table';

import { columns } from '@/components/dashboard/elections/voters/add-voters-modal/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafeUser } from '@/types';

interface AddVotersClientProps {
  elegibleVoters: SafeUser[] | null;
  rowSelection: {};
  // eslint-disable-next-line no-unused-vars
  setRowSelection?: (updater: Updater<RowSelectionState>) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedData?: (data: SafeUser[]) => void;
}

const AddVotersClient: React.FC<AddVotersClientProps> = ({
  elegibleVoters,
  rowSelection,
  setRowSelection,
  setSelectedData,
}) => {
  return (
    <DataTable
      columns={columns}
      data={elegibleVoters}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      setSelectedData={setSelectedData}
      showViewOptions={false}
      showRowSelection
    />
  );
};

export default AddVotersClient;
