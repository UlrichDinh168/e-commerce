/**
 * Generic select components
 *
 * @author Ulrich
 *
 */

import React from "react";
import { Select, MenuItem, InputLabel } from "@material-ui/core";

const CustomSelect = ({
  id,
  options,
  value,
  label,
  name,
  mandatory = false,
  fullWidth,
  handleSelectOption,
  menuProps,
  disabled = false,
  reference,
  ...props
}) => {
  const handleChange = (e) => {
    if (handleSelectOption && typeof handleSelectOption === "function") {
      handleSelectOption(e);
    }
  };

  const renderInputLabel = () => (
    <InputLabel htmlFor="custom-select">
      {label} {mandatory && <big className="mandatory"> *</big>}
    </InputLabel>
  );

  const renderOptions = () => {
    if (!options || options.length === 0) {
      return null;
    }

    return options.map((option, index) => {
      if (!option) {
        return null;
      }
      const { value, label, color } = option;
      return (
        <MenuItem key={index} value={value} style={{ color: color }}>
          {label}
        </MenuItem>
      );
    });
  };

  return (
    <div className="select-container">
      {label && renderInputLabel()}
      <Select
        value={value}
        onChange={handleChange}
        inputProps={{
          name,
          id: id || "custom-select",
        }}
        fullWidth={fullWidth !== undefined ? fullWidth : true}
        className="select"
        MenuProps={menuProps}
        disabled={disabled}
        ref={reference}
        {...props}
      >
        {renderOptions()}
      </Select>
    </div>
  );
};

export default CustomSelect;
