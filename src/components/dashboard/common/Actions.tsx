import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from 'react-icons/md';

import Button from '../../common/Button';

interface ActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

const Actions: React.FC<ActionsProps> = ({ onEdit, onDelete, disabled }) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Button
        label="Editar"
        icon={MdOutlineModeEditOutline}
        color="neutral"
        onClick={onEdit}
        disabled={disabled}
      />
      <Button
        label="Eliminar"
        icon={MdOutlineDeleteOutline}
        color="error"
        onClick={onDelete}
        disabled={disabled}
      />
    </div>
  );
};

export default Actions;
