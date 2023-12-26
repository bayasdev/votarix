import { RowSelectionState, Updater } from '@tanstack/react-table';

import { columns } from '@/app/dashboard/elections/[electionId]/voters/_components/modal/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafeUser } from '@/types';

interface AddVotersClientProps {
  elegibleVoters: SafeUser[] | null;
  selectedRows: {};
  // eslint-disable-next-line no-unused-vars
  setSelectedRows?: (updater: Updater<RowSelectionState>) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedData?: (data: SafeUser[]) => void;
}

const AddVotersClient: React.FC<AddVotersClientProps> = ({
  elegibleVoters,
  selectedRows,
  setSelectedRows,
  setSelectedData,
}) => {
  return (
    <DataTable
      columns={columns}
      data={elegibleVoters}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      setSelectedData={setSelectedData}
      showViewOptions={false}
      showRowSelection
    />
  );
};

export default AddVotersClient;
