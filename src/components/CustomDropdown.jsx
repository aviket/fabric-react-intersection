import React, { useState } from 'react';
import './CustomDropdown.css'

const CustomDropdown = ({ dropdownItems, onItemSelect }) => {


  const onOptionChangeHandler = (item) => {
    onItemSelect(item);
  };

  return (
    <div >
      <select
        onChange={onOptionChangeHandler}
      >
        <option>Please choose one option</option>
        {dropdownItems.map((dropdownItems, index) => {
          return (
            <option key={index}>
              {dropdownItems}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CustomDropdown;
