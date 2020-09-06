import React from "react";
import "./CampaignTable.css";
import { useTranslation } from "react-i18next";
import TransitionsModal from "../Modal/TModal";

import RescheduleBox from "../RescheduleBox/RescheduleBox";

export default function CampaignTable(props) {
  const [eventDetails, setEventDetails] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [openDateDialog, setOpenDateDialog] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const rescheduleEvent = (value) => {
    props.rescheduleEvent(eventDetails.id, selectedDate.getTime());
    setOpenDateDialog(value);
  };
  function onRowClick(event) {
    let siblings = event.currentTarget.parentNode.getElementsByTagName("tr");
    for (let i = 0; i < siblings.length; i++) {
      siblings[i].className = siblings[i].className.replace("row-active", "");
    }
    event.currentTarget.className += " row-active";
  }
  function setCurrentEvent(eventid) {
    let eventD = props.rows.find((ele) => ele.id === eventid);
    if (eventD !== undefined) {
      setEventDetails(eventD);
    }
  }
  function openPricingPopUp(event) {
    let eventId = parseInt(event.target.getAttribute("data-eventid"));
    setCurrentEvent(eventId);
    setOpenModal(true);
    // console.log(eventDetails);
  }

  function openDatePicker(event) {
    let eventId = parseInt(event.target.getAttribute("data-eventid"));
    let eventD = props.rows.find((ele) => ele.id === eventId);
    if (eventD !== undefined) {
      setEventDetails(eventD);
      let eventDate = new Date(eventD.createdOn);
      setSelectedDate(eventDate);
      setOpenDateDialog(true);
    }
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { t, i18n } = useTranslation("common");

  return (
    <div id="tableContainer">
      <TransitionsModal
        eventDetails={eventDetails}
        open={openModal}
        handleClose={handleCloseModal}
      />
      <RescheduleBox
        eventName={eventDetails.name}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        open={openDateDialog}
        onClose={rescheduleEvent}
      />
      <table size="small" aria-label="a dense table">
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("date")}</th>
            <th>{t("view")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row) => {
            let eventDate = new Date(row.createdOn);
            let eventDateString = eventDate.toDateString();
            eventDateString = eventDateString.slice(
              eventDateString.indexOf(" "),
              eventDateString.length
            );
            let currentDate = new Date();
            let dayDIff = Math.round(
              (eventDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
            );
            let relativeTIme = "";
            if (dayDIff < 0) {
              relativeTIme = `${-dayDIff} ${t("daysAgo")}`;
            } else if (dayDIff > 0) {
              relativeTIme = `${dayDIff} ${t("daysAhead")}`;
            } else {
              relativeTIme = `${t("today")}`;
            }
            return (
              <tr key={row.name} id={row.name} onClick={onRowClick}>
                <td className="campaign">
                  <div className="campaignImg">
                    <img src={row.image_url} />
                  </div>
                  <div>
                    <div className="campaignName">{row.name}</div>
                    <div className="campaignCountry">{row.region}</div>
                  </div>
                </td>
                <td className="time">
                  <div className="absoluteTime">{eventDateString}</div>
                  <div className="relativeTime">{relativeTIme}</div>
                </td>
                <td className="viewDetails">
                  <button data-eventid={row.id} onClick={openPricingPopUp}>
                    <i className="fa fa-usd" aria-hidden="true"></i>
                    {t("viewPricing")}
                  </button>
                </td>
                <td className="actions">
                  <div className="csv">
                    <a href={row.csv} download="CsvReport.csv">
                      <i className="fa fa-file-text" aria-hidden="true"></i>CSV
                    </a>
                  </div>
                  <div className="reports">
                    <a href={row.report} download="PdfReport.pdf">
                      <i className="fa fa-bar-chart" aria-hidden="true"></i>
                      {t("reports")}
                    </a>
                  </div>
                  <div className="schedule">
                    <button data-eventid={row.id} onClick={openDatePicker}>
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      {t("scheduleAgain")}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
