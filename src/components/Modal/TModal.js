import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./TModal.css";
import { Button } from "@material-ui/core";
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
    width: "30%",
    left: "35%",
    marginTop: "20px"
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();

  const { t, i18n } = useTranslation("common");
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
            <div className="campaign">
              <div className="campaignImg">
                <img src={props.eventDetails.image_url} />
              </div>
              <div>
                <div className="campaignCountry">
                  {props.eventDetails.region}
                </div>
                <div className="campaignName">{props.eventDetails.name}</div>
              </div>
            </div>
            <h2>{t("pricing")}</h2>
            <table>
              <tr>
                <td className="left">
                  1 {t("week")} - 1 {t("month")}
                </td>
                <td className="right">${props.eventDetails.price}</td>
              </tr>
              <tr>
                <td className="left">6 {t("month")}</td>
                <td className="right">${2 * props.eventDetails.price}</td>
              </tr>
              <tr>
                <td className="left">1 {t("year")}</td>
                <td className="right">${3 * props.eventDetails.price}</td>
              </tr>
            </table>
            <Button
              className={classes.button}
              onClick={props.handleClose}
              variant="outlined"
            >
              OK
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
