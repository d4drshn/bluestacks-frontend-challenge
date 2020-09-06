import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import translations from "./translations.json";
import { useTranslation } from "react-i18next";
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en",
  resources: translations
});
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  rootElement
);
