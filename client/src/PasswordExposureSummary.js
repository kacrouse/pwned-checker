import React from "react";

export default function PasswordExposureSummary({ pwnCount }) {
  if (pwnCount === 0) {
    return (
      <p className="bp3-running-text">
        <span role="img" aria-label="flushed face">
          😳
        </span>
        Probably best to stop using that one. It's been found in {pwnCount}{" "}
        breaches.
      </p>
    );
  }
  return (
    <p className="bp3-running-text">
      <span role="img" aria-label="100%">
        💯
      </span>
      Nice! This one hasn't been found in any breaches... yet.
    </p>
  );
}
