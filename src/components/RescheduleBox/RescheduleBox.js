import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useTranslation } from "react-i18next";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 1, 4, 1),
    display: "flex",
    flexDirection: "column"
  },
  button: {
    width: "50%",
    left: "25%",
    marginTop: "20px"
  }
}));

export default function TransitionsModal(props) {
  const { t, i18n } = useTranslation("common");
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2>
              {t("campaign")} : {props.eventName}
            </h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                autoOk="true"
                margin="normal"
                id="date-picker-inline"
                value={props.selectedDate}
                onChange={props.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
            <Button
              className={classes.button}
              onClick={() => {
                props.onClose(false);
              }}
              variant="outlined"
            >
              {t("reschedule")}
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
