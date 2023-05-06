const form = document.getElementById("form");
const submitButton = document.getElementById("submit-button");
const input = document.getElementById("waitlist-input");
const launchMessage = document.getElementById("launch-message");
const invalidEmailMessage = document.getElementById("invalid-email");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitButton.textContent = "Sending...";
  submitButton.style.backgroundColor = "#ffc338";
  submitButton.style.cursor = "not-allowed";
  input.readOnly = true;
  const email = input.value;
  const raw = JSON.stringify({
    email: email,
  });
  waitList(raw);
});

const waitList = async (_email) => {
  const url = "http://localhost:5001/join-waitlist";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: _email,
      headers: {
        "content-type": "Application/json",
      },
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      form.style.display = "none";
      launchMessage.style.display = "flex";
    } else {
      invalidEmailMessage.style.visibility = "visible";
    }
  } catch (err) {
    invalidEmailMessage.style.visibility = "visible";
    invalidEmailMessage.textContent = "Error sending request";
  } finally {
    submitButton.textContent = "Join Waitlist";
    submitButton.style.backgroundColor = "##fdaf00";
    submitButton.style.cursor = "pointer";
    input.readOnly = false;
  }
};
