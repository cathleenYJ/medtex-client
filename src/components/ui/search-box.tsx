import { useState } from "react";
import clsx from "clsx";
import { SearchIcon } from "@/components/icons";

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search...",
  value: controlledValue,
  onChange,
  onSearch,
  className
}) => {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  const handleSearchClick = () => {
    onSearch?.(value);
  };

  return (
    <div 
      className={clsx(
        "flex justify-between items-center flex-shrink-0 rounded-lg border border-medtex-lv1 sm:w-[312px] w-full",
        className
      )}
      style={{
        height: '48px',
        padding: '8px 16px',
        background: 'rgba(255, 255, 255, 0.80)',
      }}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-sm text-medtex-blue placeholder:text-gray-400"
      />
      <button
        onClick={handleSearchClick}
        className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
        type="button"
      >
        <SearchIcon />
      </button>
    </div>
  );
};
