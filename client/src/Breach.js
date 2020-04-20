import React, { useState } from "react";
import { Card, Collapse } from "@blueprintjs/core";
import "./Breach.css";

export default function Breach({ props }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card interactive={true} onClick={() => setIsOpen(!isOpen)}>
      <div className="row">
        <h4 className="bp3-heading">{props.Title}</h4>
      </div>
      <Collapse isOpen={isOpen}>
        <p>{props.Domain}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: props.Description,
          }}
        ></p>
        <p>Breach Date: {props.BreachDate}</p>
        <section>
          Included in Breach:
          <ul>
            {props.DataClasses.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>
      </Collapse>
    </Card>
  );
}
