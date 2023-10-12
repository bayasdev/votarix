import { columns } from '@/components/dashboard/elections/voters/columns';
import { DataTable } from '@/components/ui/data-table';
import { SafeUser } from '@/types';

interface AddVotersClientProps {
  elegibleVoters: SafeUser[] | null;
  // eslint-disable-next-line no-unused-vars
  onSelectedRowsChange?: (data: SafeUser[]) => void;
}

const AddVotersClient: React.FC<AddVotersClientProps> = ({
  elegibleVoters,
  onSelectedRowsChange,
}) => {
  return (
    <DataTable
      columns={columns}
      data={elegibleVoters}
      onSelectedRowsChange={onSelectedRowsChange}
      showViewOptions={false}
      showRowSelection
    />
  );
};

export default AddVotersClient;
