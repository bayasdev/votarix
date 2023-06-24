'use client';

import {
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from 'react-icons/md';

import Button from '../Button';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Button
        label="Editar"
        icon={MdOutlineModeEditOutline}
        color="neutral"
        onClick={onEdit}
      />
      <Button
        label="Editar"
        icon={MdOutlineDeleteOutline}
        color="error"
        onClick={onDelete}
      />
    </div>
  );
};

export default TableActions;
