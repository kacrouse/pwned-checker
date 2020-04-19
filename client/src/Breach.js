import React, { useState } from "react";
import { Card, Collapse, Button } from "@blueprintjs/core";
import "./Breach.css";

export default function Breach({ props }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="row">
        <Button
          icon={`chevron-${isOpen ? "down" : "right"}`}
          minimal={true}
          onClick={() => setIsOpen(!isOpen)}
        />
        <h2 className="bp3-heading">{props.Title}</h2>
      </div>
      <Collapse isOpen={isOpen}>
        <Card>
          {props.Domain ? <img height="100px" src={props.LogoPath} alt={`logo for ${props.Domain}`} /> : ""}
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
        </Card>
      </Collapse>
    </div>
  );
}
