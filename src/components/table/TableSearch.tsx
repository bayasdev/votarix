'use client';

import { MdSearch } from 'react-icons/md';

type TableSearchProps = {
  value: string;
  onChange: (value: string) => void;
};
const TableSearch: React.FC<TableSearchProps> = ({ value, onChange }) => {
  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Buscar..."
          className="input-bordered input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span>
          <MdSearch size={20} />
        </span>
      </div>
    </div>
  );
};

export default TableSearch;
