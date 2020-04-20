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
      let pwnCount;
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
      setResultMarkup(<PasswordExposureSummary pwnCount={pwnCount}/>);
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
