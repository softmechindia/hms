const SearchableSelect = ({ options, selectedValue, onSelect, onAddNew, onEdit, placeholder, labelKey }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredOptions = options.filter(opt =>
    opt[labelKey]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex-1" ref={containerRef}>
      <div className="flex items-center border border-gray-300 rounded bg-white h-9 px-2">
        <input
          type="text"
          className="w-full text-sm outline-none placeholder-black"
          placeholder={selectedValue || placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <div className="flex items-center gap-1 ml-1">
          <button type="button" onClick={onAddNew} className="p-1 bg-orange-500 text-white rounded-sm">
            <Plus size={12} />
          </button>
          <button type="button" onClick={onEdit} className="p-1 bg-blue-500 text-white rounded-sm">
            <Edit2 size={12} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-[60] w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => (
              <div
                key={index}
                className="px-3 py-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer"
                onClick={() => {
                  onSelect(opt[labelKey]);
                  setSearchTerm("");
                  setIsOpen(false);
                }}
              >
                {opt[labelKey]}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};