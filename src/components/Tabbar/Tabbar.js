import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useTranslation } from "react-i18next";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./Tabbar.css";

export default function Tabbar(props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#2b8c45"
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f"
      }
    }
  });

  const { t, i18n } = useTranslation("common");
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <button onClick={updateTable}>click</button> */}
        <Tabs
          className="tabs"
          value={props.value}
          onChange={props.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab className="tab" label={t("pastCampaigns")} />
          <Tab className="tab" label={t("liveCampaigns")} />
          <Tab className="tab" label={t("upcomingCampaigns")} />
        </Tabs>
      </ThemeProvider>
    </div>
  );
}
