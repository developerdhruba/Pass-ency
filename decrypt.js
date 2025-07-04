function simpleDecrypt(encrypted) {
  try {
    return decodeURIComponent(escape(atob(encrypted)));
  } catch {
    return "Invalid encrypted text!";
  }
}

window.decrypt = () => {
  const input = document.getElementById("encInput").value;
  const result = simpleDecrypt(input);
  document.getElementById("output").innerText = "Original Password: " + result;
};