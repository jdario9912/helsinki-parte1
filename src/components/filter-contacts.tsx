import { useId } from "react";

type Props = {
  filter: string;
  handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const FilterContacts = ({ filter, handleFilter }: Props) => {
  const idFilter = useId();

  return (
    <div className="filter-container">
      <label htmlFor={idFilter}>
        <span className="label-input">search</span>
        <input
          type="text"
          name="filter"
          id={idFilter}
          onChange={handleFilter}
          value={filter}
        />
      </label>
    </div>
  );
};

export default FilterContacts;
