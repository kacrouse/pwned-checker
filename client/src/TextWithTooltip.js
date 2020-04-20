import React from 'react';
import { Tooltip } from "@blueprintjs/core";

export default function TextWithTooltip({ text, tooltip }) {
  return (
    <Tooltip content={tooltip}>
      <span className="bp3-tooltip-indicator">{text}</span>
    </Tooltip>
  );
}
