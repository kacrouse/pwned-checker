import React, { useState } from "react";
import "./App.css";
import { fetchBreaches, fetchPastes, fetchPwnedPasswords } from "./api/hibp";
import {
  Button,
  ControlGroup,
  InputGroup,
  HTMLSelect,
} from "@blueprintjs/core";
import Breach from "./Breach";
import Paste from "./Paste";

function App() {
  const [searchType, setSearchType] = useState("account");
  const [searchValue, setSearchValue] = useState("");
  const [breaches, setBreaches] = useState([]);
  const [pastes, setPastes] = useState([]);
  const [passwordPwnCount, setPasswordPwnCount] = useState();
  const search = async () => {
    setBreaches([]);
    setPastes([]);
    setPasswordPwnCount();
    if (searchType === "account") {
      const breaches = await fetchBreaches(searchValue);
      const pastes = await fetchPastes(searchValue);
      setBreaches(breaches);
      setPastes(pastes);
    } else if (searchType === "password") {
      const pwnCount = await fetchPwnedPasswords(searchValue);
      setPasswordPwnCount(pwnCount);
    }
  };

  return (
    <div className="App">
      <div className="input">
        <ControlGroup>
          <HTMLSelect
            value={searchType}
            onChange={(evt) => setSearchType(evt.target.value)}
            large={true}
          >
            <option value="account">Email or Username</option>
            <option value="password">Password</option>
          </HTMLSelect>
          <InputGroup
            type={searchType === "password" ? "password" : "text"}
            value={searchValue}
            onChange={(evt) => setSearchValue(evt.target.value)}
            large={true}
            fill={true}
          />
          <Button icon="arrow-right" onClick={search} />
        </ControlGroup>
      </div>
      <div>
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
        <h1 className="bp3-heading">{passwordMessage(passwordPwnCount)}</h1>
      </div>
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
