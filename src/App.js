import React from "react";
import { useState } from "react";
import "./styles.css";
import CampaignTable from "./components/DataTable/CampaignTable";
import Tabbar from "./components/Tabbar/Tabbar";
import sampleJSON from "./components/SampleJSON.json";
import { useTranslation } from "react-i18next";
import { getCampaignList } from "./components/Utils.js";
import { Select, MenuItem } from "@material-ui/core";

export default function App() {
  const [mainData, setMainData] = useState(sampleJSON.data);
  const [rows, setRows] = useState(getCampaignList(0, mainData));
  const [value, setValue] = React.useState(0);
  const [language, setLanguage] = React.useState("en");
  const { t, i18n } = useTranslation("common");

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    let updatedData = getCampaignList(newValue, mainData);
    setValue(newValue);
    setRows(() => updatedData);
    //console.log(newValue);
  };
  const rescheduleEvent = (eventid, newDate) => {
    setMainData((currentData) => {
      currentData.forEach((element) => {
        if (element.id === eventid) {
          element.createdOn = newDate;
          return;
        }
      });
      return currentData;
    });
    setRows(getCampaignList(value, mainData));
  };
  return (
    <div className="root_container">
      <div>
        <div className="root_title">{t("manageCampaigns")}</div>
        <div className="simple-select">
          {t("language")} <span />
          <Select onChange={changeLanguage} value={language}>
            <MenuItem value="en">
              <em>English</em>
            </MenuItem>
            <MenuItem value="de">Deutsche</MenuItem>
          </Select>
        </div>
        <Tabbar value={value} handleTabChange={handleTabChange} />
        <CampaignTable rows={rows} rescheduleEvent={rescheduleEvent} />
      </div>
    </div>
  );
}
