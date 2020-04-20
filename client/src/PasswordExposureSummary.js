import React from 'react';

export default function PasswordExposureSummary({pwnCount}) {
  return (<p className="bp3-running-text">{passwordMessage(pwnCount)}</p>);
}

function passwordMessage(pwnCount) {
  if (pwnCount === undefined) {
    return null;
  }
  return pwnCount > 0
    ? `Probably best to stop using that one. It's been found in ${pwnCount} breaches.`
    : "Nice! This one hasn't been found in any breaches... yet.";
}