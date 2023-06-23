import Link from 'next/link';
import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from 'react-icons/md';

interface TableActionsProps {
  id: string;
  model: string;
}

const TableActions: React.FC<TableActionsProps> = ({ id, model }) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Link href={`/dashboard/${model}/${id}`} className="btn-neutral btn">
        <MdOutlineModeEditOutline size={20} />
        Editar
      </Link>
      <button className="btn-error btn" onClick={() => {}}>
        <MdOutlineDeleteOutline size={20} />
        Eliminar
      </button>
    </div>
  );
};

export default TableActions;
