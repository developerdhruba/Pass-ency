function simpleDecrypt(encrypted) {
  try {
    return decodeURIComponent(escape(atob(encrypted)));
  } catch {
    return "Invalid encrypted text!";
  }
}

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const encrypted = urlParams.get('enc');
  if (encrypted) {
    document.getElementById("encInput").value = encrypted;
    document.getElementById("output").innerText = "Original Password: " + simpleDecrypt(encrypted);
  }
};

window.decrypt = () => {
  const input = document.getElementById("encInput").value;
  const result = simpleDecrypt(input);
  document.getElementById("output").innerText = "Original Password: " + result;
};
