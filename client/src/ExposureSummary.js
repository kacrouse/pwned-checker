import React from "react";
import "./ExposureSummary.css";
import { Tag } from "@blueprintjs/core";
import TextWithTooltip from "./TextWithTooltip";

export default function ExposureSummary({ breaches, pastes }) {
  return (
    <section className="bp3-running-text">
      <p>
        This account has been found in {breaches.length}{" "}
        <TextWithTooltip
          text="breaches"
          tooltip="A breach is an instance of a system having been compromised by
              an attacker and the data disclosed."
        />{" "}
        and {pastes.length}{" "}
        <TextWithTooltip
          text="pastes"
          tooltip="Often when online services are compromised, the first signs of it
              appear on 'paste' sites like Pastebin. Attackers frequently
              publish either samples or complete dumps of compromised data on
              these services. Monitoring and reporting on the presence of email
              addresses on the likes of Pastebin can give impacted users a head
              start on mitigating the potential fallout from a breach."
        />
        .
      </p>
      <h3>Exposed Information</h3>
      {Object.entries(summarizeDataClasses(breaches)).map(
        ([dataClass, count]) => (
          <Tag key={dataClass} className="tag">
            {dataClass} ({count})
          </Tag>
        )
      )}
    </section>
  );
}

const summarizeDataClasses = (breaches) => {
  return breaches
    .map((b) => b.DataClasses)
    .flat()
    .reduce(
      (summary, dataClass) => ({
        ...summary,
        [dataClass]: summary[dataClass] ? summary[dataClass] + 1 : 1,
      }),
      {}
    );
};
