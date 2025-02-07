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
              className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
            >
              {option.label}
              <button
                className="ml-2 text-gray-600 hover:text-gray-400"
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
        <div className="relative mb-2">
          <input
            ref={searchInputRef}
            type="text"
            className="w-full p-2 border border-gray-300 rounded pl-8"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
          {searchQuery && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
            >
              ×
            </button>
          )}
        </div>
      )}
      <div className="max-h-60 overflow-y-auto">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedValues.includes(option.value) ? "bg-blue-100" : ""
              }`}
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
        className="w-full p-2 border border-gray-300 rounded cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {multiple
            ? selectedChips || placeholder
            : options.find((opt) => opt.value === value)?.label || placeholder}
        </div>
        <span className="text-gray-400">▼</span>
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
