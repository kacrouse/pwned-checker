import React, { useState } from "react";
import {
  Button,
  ControlGroup,
  InputGroup,
  HTMLSelect,
  Spinner
} from "@blueprintjs/core";

export default function SearchInput({ handleSearch, showSpinner }) {
  const [searchType, setSearchType] = useState("account");
  const [searchValue, setSearchValue] = useState("");
  const handleSearchTypeChange = (newValue) => {
    setSearchType(newValue);
    setSearchValue("");
  };

  return (
    <ControlGroup>
      <HTMLSelect
        value={searchType}
        onChange={(evt) => handleSearchTypeChange(evt.target.value)}
        large={true}
      >
        <option value="account">Email</option>
        <option value="password">Password</option>
      </HTMLSelect>
      <InputGroup
        type={searchType === "password" ? "password" : "email"}
        value={searchValue}
        onChange={(evt) => setSearchValue(evt.target.value)}
        large={true}
        fill={true}
        rightElement={showSpinner ? <Spinner size={Spinner.SIZE_SMALL}/> : null}
      />
      <Button
        icon="arrow-right"
        disabled={!searchValue}
        onClick={() => handleSearch({ searchType, searchValue })}
      />
    </ControlGroup>
  );
}
