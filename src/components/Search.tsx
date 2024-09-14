export default function Search({value, setSearchValue}: {value: string, setSearchValue: () => void}) {

  const handleSearch = ()  
  return (
    <div className="h-full w-full">
      <input
        type="search"
        onChange={(e) => setSearchValue(vme.target.value)}
        value={value}
        placeholder="Search for a friend"
        className="px-3 py-2 [&::-webkit-search-cancel-button]:hidden  outline-none focus:outline-none bg-primary text-primary-content placeholder:text-primary-content rounded-md w-full mr-3"
      />
    </div>
  );
}
