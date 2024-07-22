import { useSearchParams } from "react-router-dom";

interface Props {
  filterField: string;
  options: FilterProps[];
}

interface FilterProps {
  value: string;
  label: string;
}

export const Filter = ({ filterField, options }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };
  return (
    <div className="bg-base-200 p-1 flex rounded-md space-x-2">
      {options.map((opt) => (
        <button
          onClick={() => handleClick(opt.value)}
          key={opt.value}
          className={`${
            opt.value === currentFilter
              ? "bg-gray-500 rounded-md text-white"
              : ""
          } text-sm px-2 py-0.5 w-full`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

