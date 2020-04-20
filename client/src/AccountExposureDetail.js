import React, { useState } from "react";
import { Button, Collapse } from "@blueprintjs/core";
import Breach from "./Breach";

export default function AccountExposureDetail({ breaches, pastes }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section>
      <Button onClick={() => setIsOpen(!isOpen)}>
        See Details
      </Button>
      <Collapse isOpen={isOpen}>
        <h3>Breaches</h3>
        <ul className="bp3-list-unstyled">
          {breaches.map((breach) => (
            <li key={breach.Name}>
              <Breach props={breach} />
            </li>
          ))}
        </ul>
      </Collapse>
    </section>
  );
}
