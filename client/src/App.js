import React, { useState } from "react";
import "./App.css";
import { fetchBreaches, fetchPastes, fetchPwnedPasswords } from "./api/hibp";
import SearchInput from "./SearchInput";
import ExposureSummary from "./ExposureSummary";
import AccountExposureDetail from "./AccountExposureDetail";
import { Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AppToaster } from "./AppToaster";

function App() {
  const [breaches, setBreaches] = useState([]);
  const [pastes, setPastes] = useState([]);
  const [passwordPwnCount, setPasswordPwnCount] = useState();
  const [resultMarkup, setResultMarkup] = useState(null);
  const search = async ({ searchType, searchValue }) => {
    setBreaches([]);
    setPastes([]);
    setPasswordPwnCount();
    if (searchType === "account") {
      let breaches;
      let pastes;
      try {
        breaches = await fetchBreaches(searchValue);
        pastes = await fetchPastes(searchValue);
      } catch (error) {
        AppToaster.show({
          message: `Error: ${error.message}`,
          intent: Intent.DANGER,
          icon: IconNames.WARNING_SIGN,
        });
        return;
      }
      setBreaches(breaches);
      setPastes(pastes);
      setResultMarkup(
        <div>
          <ExposureSummary breaches={breaches} pastes={pastes} />
          <AccountExposureDetail breaches={breaches} pastes={pastes} />
        </div>
      );
    } else if (searchType === "password") {
      let pwnCount = await fetchPwnedPasswords(searchValue);
      try {
        pwnCount = await fetchPwnedPasswords(searchValue);
      } catch (error) {
        AppToaster.show({
          message: `Error: ${error.message}`,
          intent: Intent.DANGER,
          icon: IconNames.WARNING_SIGN,
        });
        return;
      }
      setPasswordPwnCount(pwnCount);
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

function passwordMessage(pwnCount) {
  if (pwnCount === undefined) {
    return null;
  }
  return pwnCount > 0
    ? `Probably best to stop using that one. It's been found in ${pwnCount} breaches.`
    : "Nice! This one hasn't been found in any breaches... yet.";
}

export default App;
