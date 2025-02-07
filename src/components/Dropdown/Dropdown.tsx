import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  usePortal?: boolean;
  renderOption?: (option: DropdownOption) => React.ReactNode;
  className?: string;
  zIndex?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  multiple = false,
  searchable = true,
  usePortal = true,
  renderOption,
  className = "",
  zIndex = 1001,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const newValue = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
    setSearchQuery("");
  };

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const removeSelectedValue = (optionValue: string) => {
    onChange(selectedValues.filter((v) => v !== optionValue));
  };

  const selectedChips =
    multiple && selectedValues.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {selectedValues.map((v) => {
          const option = options.find((opt) => opt.value === v);
          return option ? (
            <div
              key={v}
              className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-md"
            >
              {option.label}
              <button
                className="ml-2 text-white hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedValue(v);
                }}
              >
                ×
              </button>
            </div>
          ) : null;
        })}
      </div>
    ) : null;

  const dropdownContent = (
    <div
      ref={menuRef}
      className="absolute left-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-2"
      style={{ zIndex }}
    >
      {searchable && (
        <input
          ref={searchInputRef}
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <div className="max-h-60 overflow-y-auto">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option.value)}
            >
              {renderOption ? renderOption(option) : option.label}
            </div>
          ))
        ) : (
          <div className="text-gray-500 px-4 py-2">No options found</div>
        )}
      </div>
    </div>
  );

  const dropdownStyles = usePortal
    ? {
        position: "absolute" as const,
        top: containerRef.current?.getBoundingClientRect().bottom || 0,
        left: containerRef.current?.getBoundingClientRect().left || 0,
        width: containerRef.current?.offsetWidth || "auto",
      }
    : {};

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className="w-full p-2 border border-gray-300 rounded cursor-pointer flex flex-wrap gap-2 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {multiple
          ? selectedChips || placeholder
          : options.find((opt) => opt.value === value)?.label || placeholder}
      </div>
      {isOpen &&
        (usePortal
          ? createPortal(
              <div style={dropdownStyles}>{dropdownContent}</div>,
              document.body
            )
          : dropdownContent)}
    </div>
  );
};
