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
            <div className="breachDetail">
              <AccountExposureDetail
                breaches={breaches}
                pastes={pastes}
              />
            </div>
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
    <main>
      <h1>Has your data been exposed in any breaches? <span role="img" aria-label="scared face">😱</span></h1>
      <p>Type your email or password in the box below to find out. None of your info will be stored, promise.</p> 
      <div className="App">
        <div className="content">
          <SearchInput handleSearch={search} />
          <div className="results">{resultMarkup}</div>
        </div>
      </div>
    </main>
  );
}

export default App;
