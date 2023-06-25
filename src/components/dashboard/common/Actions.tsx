import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from 'react-icons/md';

import Button from '../../common/Button';

interface ActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const Actions: React.FC<ActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Button
        label="Editar"
        icon={MdOutlineModeEditOutline}
        color="neutral"
        onClick={onEdit}
      />
      <Button
        label="Eliminar"
        icon={MdOutlineDeleteOutline}
        color="error"
        onClick={onDelete}
      />
    </div>
  );
};

export default Actions;
