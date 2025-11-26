import React, { useState } from 'react';
import { DropdownProps, Option, DropdownValue } from '../../types/dropdown';
import styles from './Dropdown.module.css';

const Dropdown: React.FC<DropdownProps> = ({
  value = '',
  onChange,
  options = [
    { value: 'isCompleted', label: 'isCompleted' },
    { value: 'isImport', label: 'isImport' },
  ],
  placeholder = 'Выберите опцию',
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newValue = event.target.value as DropdownValue;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.dropdownContainer}>
      <select value={selectedValue} onChange={handleChange} className={styles.dropdown}>
        <option value="" className={styles.dropdown__option}>
          {placeholder}
        </option>
        {options.map((option: Option) => (
          <option key={option.value} value={option.value} className={styles.dropdown__option}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
