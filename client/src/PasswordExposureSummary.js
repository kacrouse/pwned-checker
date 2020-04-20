import React from "react";

export default function PasswordExposureSummary({ pwnCount }) {
  return pwnCount > 0 ? (
    <p className="bp3-running-text">
      <span role="img" aria-label="flushed face">
        😳
      </span>
      Probably best to stop using that one. It's been found in {pwnCount}{" "}
      breaches.
    </p>
  ) : (
    <p className="bp3-running-text">
      <span role="img" aria-label="100%">
        💯
      </span>
      Nice! This one hasn't been found in any breaches... yet.
    </p>
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
