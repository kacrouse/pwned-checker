import React, { useState } from "react";
import "./App.css";
import { fetchBreaches, fetchPastes, fetchPwnedPasswords } from "./api/hibp";
import Breach from "./Breach";
import Paste from "./Paste";
import SearchInput from "./SearchInput";
import ExposureSummary from "./ExposureSummary";

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
      const breaches = await fetchBreaches(searchValue);
      const pastes = await fetchPastes(searchValue);
      setBreaches(breaches);
      setPastes(pastes);
      setResultMarkup(
        <div>
          <ExposureSummary breaches={breaches} pastes={pastes} />
          <section>
            <ul className="bp3-list-unstyled">
              {breaches.map((breach) => (
                <li key={breach.Name}>
                  <Breach props={breach} />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <ul className="bp3-list-unstyled">
              {pastes.map((paste) => (
                <li key={paste.Id}>
                  <Paste props={paste} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      );
    } else if (searchType === "password") {
      const pwnCount = await fetchPwnedPasswords(searchValue);
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
