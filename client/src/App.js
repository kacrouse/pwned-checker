import React, { useState } from "react";
import "./App.css";
import { fetchBreaches, fetchPastes, fetchPwnedPasswords } from "./api/hibp";
import SearchInput from "./SearchInput";
import ExposureSummary from "./ExposureSummary";
import PasswordExposureSummary from "./PasswordExposureSummary";
import AccountExposureDetail from "./AccountExposureDetail";
import { Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AppToaster } from "./AppToaster";

function App() {
  const [resultMarkup, setResultMarkup] = useState(null);
  const search = async ({ searchType, searchValue }) => {
    if (searchType === "account") {
      try {
        const breaches = await fetchBreaches(searchValue);
        const pastes = await fetchPastes(searchValue);
        setResultMarkup(
          <div>
            <ExposureSummary breaches={breaches} pastes={pastes} />
            <AccountExposureDetail breaches={breaches} pastes={pastes} />
          </div>
        );
      } catch (error) {
        AppToaster.show({
          message: `Error: ${error.message}`,
          intent: Intent.DANGER,
          icon: IconNames.WARNING_SIGN,
        });
      }
    } else if (searchType === "password") {
      try {
        const pwnCount = await fetchPwnedPasswords(searchValue);
        setResultMarkup(<PasswordExposureSummary pwnCount={pwnCount} />);
      } catch (error) {
        AppToaster.show({
          message: `Error: ${error.message}`,
          intent: Intent.DANGER,
          icon: IconNames.WARNING_SIGN,
        });
      }
    }
  };

  return (
    <div className="App">
      <div className="input">
        <SearchInput handleSearch={search} />
      </div>
      <div>{resultMarkup}</div>
    </div>
  );
}

export default App;
