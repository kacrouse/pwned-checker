import React from "react";
import { Tab, Tabs } from "@blueprintjs/core";
import Breach from "./Breach";
import Paste from "./Paste";

export default function AccountExposureDetail({ breaches, pastes }) {
  return (
    <Tabs>
      <Tab
        id="breaches"
        title="Breaches"
        panel={
          <ul className="bp3-list-unstyled">
            {breaches.map((breach) => (
              <li key={breach.Name}>
                <Breach props={breach} />
              </li>
            ))}
          </ul>
        }
      />
      <Tab
        id="pastes"
        title="Pastes"
        panel={
          <ul className="bp3-list-unstyled">
            {pastes.map((paste) => (
              <li key={paste.Id}>
                <Paste props={paste} />
              </li>
            ))}
          </ul>
        }
      />
    </Tabs>
  );
}
