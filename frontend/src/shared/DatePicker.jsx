/**
 * Date picker
 *
 * @author Ulrich
 *
 * @copyright Vertics Oy 2021
 */
import React, { Fragment, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
function BasicDatePicker({
  value,
  onChange,
  label,
  format = "DD.MM.yyyy",
  reference,
  disabled,
}) {
  return (
    <div className="date-picker">
      <MuiPickersUtilsProvider utils={MomentUtils} locale="en">
        <label htmlFor="">{label}</label>
        <DatePicker
          variant="inline"
          format={format}
          value={value}
          onChange={onChange}
          inputRef={reference}
          disabled={disabled}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default BasicDatePicker;
