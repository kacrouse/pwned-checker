import React, { useState } from "react";
import "./App.css";
import { fetchBreaches, fetchPastes, fetchPwnedPasswords } from "./api/hibp";
import SearchInput from "./SearchInput";
import AccountExposureSummary from "./AccountExposureSummary";
import AccountExposureDetail from "./AccountExposureDetail";
import PasswordExposureSummary from "./PasswordExposureSummary";
import { Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AppToaster } from "./AppToaster";

function App() {
  const [resultMarkup, setResultMarkup] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const search = async ({ searchType, searchValue }) => {
    setShowSpinner(true);
    if (searchType === "account") {
      try {
        const breaches = await fetchBreaches(searchValue);
        const pastes = await fetchPastes(searchValue);
        setResultMarkup(
          <div>
            <AccountExposureSummary breaches={breaches} pastes={pastes} />
            <div className="breachDetail">
              <AccountExposureDetail
                breaches={breaches}
                pastes={pastes}
              />
            </div>
          </div>
        );
      } catch (error) {
        showError(error.message);
      }
    } else if (searchType === "password") {
      try {
        const pwnCount = await fetchPwnedPasswords(searchValue);
        setResultMarkup(<PasswordExposureSummary pwnCount={pwnCount} />);
      } catch (error) {
        showError(error.message);
      }
    }
    setShowSpinner(false);
  };

  return (
    <main>
      <h1>Has your data been exposed in any breaches? <span role="img" aria-label="scared face">😱</span></h1>
      <p>Type your email or password in the box below to find out. None of your info will be stored, promise.</p> 
      <div className="App">
        <div className="content">
          <SearchInput handleSearch={search} showSpinner={showSpinner}/>
          <div className="results">{resultMarkup}</div>
        </div>
      </div>
    </main>
  );
}

const showError = (message) => {
  AppToaster.show({
    message: `Error: ${message}`,
    intent: Intent.DANGER,
    icon: IconNames.WARNING_SIGN,
  });
}

export default App;
