import React from 'react';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
];

interface MultiSelectDropdownProps {
  onChange: (selectedOptions: Option[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ onChange }) => {
  return (
    <Select
      options={options}
      isMulti
      onChange={(selectedOptions) => onChange(selectedOptions as Option[])}
    />
  );
};

export default MultiSelectDropdown;
