import { MdSearch } from 'react-icons/md';

type SearchProps = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Buscar..."
          className="input-bordered input"
          value={value}
          onChange={onChange}
        />
        <span>
          <MdSearch size={20} />
        </span>
      </div>
    </div>
  );
};

export default Search;
