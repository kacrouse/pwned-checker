const fetchBreaches = async (account) => {
  const response = await fetch(
    `/hibp/breachedaccount/${encodeURIComponent(
      account
    )}?truncateResponse=false`,
    { headers: { Accept: "application/json" } }
  );
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw Error(await response.text());
  }
  return response.json();
};

const fetchPastes = async (account) => {
  const response = await fetch(
    `/hibp/pasteaccount/${encodeURIComponent(account)}`,
    { headers: { Accept: "application/json" } }
  );
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw Error(await response.text());
  }
  return response.json();
};

const fetchPwnedPasswords = async (password) => {
  const passwordHash = await hash(password);
  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${passwordHash.slice(0, 5)}`,
    { headers: { Accept: "text/plain" } }
  );
  if (!response.ok) {
    throw Error(await response.text());
  }
  const resultText = await response.text();
  const result = resultText.split("\n").find((result) => {
    return passwordHash.toLowerCase().endsWith(result.split(":")[0].toLowerCase());
  });
  return result ? parseInt(result.split(":")[1]) : 0;
};

const hash = async (str) => {
  const msgUint8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

export { fetchBreaches, fetchPastes, fetchPwnedPasswords };
