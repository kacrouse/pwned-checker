import React, { useState } from "react";
import { Card, Collapse, Button } from "@blueprintjs/core";

export default function Paste({props}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="row">
        <Button
          icon={`chevron-${isOpen ? "down" : "right"}`}
          minimal={true}
          onClick={() => setIsOpen(!isOpen)}
        />
        <h2 className="bp3-heading">{props.Title || props.Id}</h2>
      </div>
      <Collapse isOpen={isOpen}>
        <Card>
          <p>Source: {props.Source}</p>
          <p>Posted: {props.Date}</p>
        </Card>
      </Collapse>
    </div>
  );
}