import React from "react";
import DateFnsUtils from "@material-ui/pickers"
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers"
export default function DatePicker(props) {
  return (
    <div>
      <MuiPickersUtilsProvider utils={props.DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={props.selectedDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
    </div>
  );
}
