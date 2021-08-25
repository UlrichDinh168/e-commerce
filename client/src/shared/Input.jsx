/**
 * Generic Input component
 *
 *
 */

import React, { useState } from "react";

const Input = ({
  step,
  type,
  label,
  onChange,
  disabled,
  autoFocus,
  value,
  placeholder,
  name,
  mandatory = false,
  className,
  icon,
  iconName,
  reference,
  id,
  inputProps,
  hasError,
  error,
  handleClickInputIcon,
  isTooltip,
  tooltiptext,
  multiline = false,
  rows,
  ...props
}) => {
  const [focusClass, setFocusClass] = useState("");
  const labelClassName = ["input-field__label"];
  if (isTooltip) {
    labelClassName.push("tooltip");
  }
  const Icon = () => {
    if (iconName) {
      return (
        <span
          className="material-icons"
          onClick={() => {
            if (!disabled) {
              handleClickInputIcon("send");
            }
          }}
        >
          {iconName}
        </span>
      );
    }

    if (icon) {
      return icon;
    }

    return null;
  };

  const labelEl = label && (
    <label className={labelClassName.join(" ")}>
      {label} {mandatory && <big className="mandatory"> *</big>}{" "}
      {tooltiptext && <span className="tooltiptext">{tooltiptext}</span>}
    </label>
  );

  return (
    <div
      className={`input-field ${
        disabled && "disabled"
      } ${focusClass} ${className}`}
    >
      {labelEl}
      <div className="input-field__input-content">
        {multiline ? (
          <textarea
            step={step}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            ref={reference}
            id={id}
            {...inputProps}
            onFocus={() => setFocusClass("focus")}
            onBlur={() => setFocusClass("")}
            autoFocus={autoFocus}
            rows={rows || 2}
          />
        ) : (
          <input
            autofill="chrome-off"
            step={step}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            ref={reference}
            id={id}
            {...inputProps}
            onFocus={() => setFocusClass("focus")}
            onBlur={() => setFocusClass("")}
            autoFocus={autoFocus}
            {...props}
          />
        )}
        <div className="input-field__icon-container">
          <Icon />
        </div>
      </div>
      <span className="error">{error}</span>
    </div>
  );
};

Input.defaultProps = {
  // label: '',
  // type: 'text',
  // value: '',
  // className: '',
  // focusClass: '',
  // handleClickInputIcon: () => {},
  // disabled: false
};

export default Input;
