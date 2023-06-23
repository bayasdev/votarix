import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from 'react-icons/md';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <button className="btn-neutral btn" onClick={onEdit}>
        <MdOutlineModeEditOutline size={20} />
        Editar
      </button>
      <button className="btn-error btn" onClick={onDelete}>
        <MdOutlineDeleteOutline size={20} />
        Eliminar
      </button>
    </div>
  );
};

export default TableActions;
