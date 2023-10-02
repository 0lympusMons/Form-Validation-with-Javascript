/* eslint-disable no-underscore-dangle */

const form = document.querySelector("form");
const emailField = document.querySelector("#email");
const country = document.querySelector("#country");
const zipcode = document.querySelector("#zipcode");
const password = document.querySelector("#password");
const confPasswordField = document.querySelector("#confPassword");
const submitButton = document.querySelector("submit");

emailField.addEventListener("input", () => {
  if (emailField.validity.typeMismatch) {
    showError(emailField);
    // emailField.setCustomValidity("I am expecting an email address!");
  } else {
    hideError(emailField);
    emailField.setCustomValidity("");
  }
});

function showError(field) {
  field.validity.valid = false;
  const errorSpan = document.querySelector(`#${field.id}Error`);
  errorSpan.textContent = field.validationMessage;
  errorSpan.classList.add("active");
}

function hideError(field) {
  field.validity.valid = true;
  const errorSpan = document.querySelector(`#${field.id}Error`);
  errorSpan.textContent = "";
  errorSpan.classList.remove("active");
}

function checkZIP() {
  const ZIP = {
    PH: ["^\\d{4}$", "Use following format: NNNN"],

    CN: ["^\\d{6}$", "Use the following format: NNNNNN"],

    TW: ["^\\d{5}$", "Use the following format: NNNNN"],

    ID: ["^\\d{5}$", "Use the following format: NNNNN"],
  };

  // zipcode.setAttribute("placeholder", ZIP[`${country}`][1]);

  const constraint = new RegExp(ZIP[`${country.value}`][0], "");

  if (zipcode.value == "") {
    zipcode.setCustomValidity("");
    hideError(zipcode);
  } else if (!constraint.test(zipcode.value)) {
    zipcode.setCustomValidity(ZIP[`${country.value}`][1]);
    showError(zipcode);
  } else {
    zipcode.setCustomValidity("");
    hideError(zipcode);
  }
}

function checkPassword() {
  console.log(password.value);

  // todo make validator for password field

  const uppercaseRegex = /^(?=.*[A-Z])/;
  const lowercaseRegex = /^(?=.*[a-z])/;
  const specialcaseRegex = /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-])/;
  const minLengthRegex = /^.{8,}$/;

  const passwordConstraint = new RegExp(
    uppercaseRegex.source +
      lowercaseRegex.source +
      specialcaseRegex.source +
      minLengthRegex.source
  );

  // const passwordConstraint = new RegExp(combinedRegex, "");

  // * console.log(passwordConstraint.test("P@ssw0rd"));
  console.log(`pw check: ${passwordConstraint.test(password.value)}`);

  let passIsOk = false;

  function setConfPassAvailability(available) {
    // available = true | false;
    const confPassField = document.getElementById("confPassword");

    if (available === true) {
      confPassField.removeAttribute("disabled");
    } else {
      confPassField.setAttribute("disabled", "true");
    }
  }

  // todo show error if validity not matched
  if (password.value == "") {
    // if pass is empty
    password.setCustomValidity("");
    hideError(password);
    setConfPassAvailability(false);
  } else if (!passwordConstraint.test(password.value)) {
    // if password passes constraints
    const checker = [
      uppercaseRegex.test(password.value),
      specialcaseRegex.test(password.value),
      lowercaseRegex.test(password.value),
    ];

    const missingCriteria = [];
    if (!checker[0]) {
      missingCriteria.push("1 uppercase letter");
    }
    if (!checker[1]) {
      missingCriteria.push("1 special case character");
    }
    if (!checker[2]) {
      missingCriteria.push("1 lowercase letter");
    }

    if (missingCriteria.length > 0) {
      password.setCustomValidity(
        `Password must contain: ${missingCriteria.join(", ")}`
      );
      showError(password);
      setConfPassAvailability(false);
    } else if (password.value.length < 8) {
      // if password length is less than 8
      password.setCustomValidity(
        `Your password lacks ${8 - password.value.length} characters`
      );

      showError(password);
      setConfPassAvailability(false);
    }
  } else if (password.value.length < 8) {
    // if password length is less than 8
    password.setCustomValidity(
      `Your password lacks ${8 - password.value.length} characters`
    );

    showError(password);
    setConfPassAvailability(false);
  } else {
    password.setCustomValidity("");
    hideError(password);
    setConfPassAvailability(true);
  }
}

function checkConfPassword() {
  // if match, make fields green
  // if not, make red
  // if field is empty, make it normal

  if (password.value === confPasswordField.value) {
    confPasswordField.setCustomValidity("");
    hideError(confPasswordField);
  } else if (confPasswordField.value === "") {
    confPasswordField.setCustomValidity("");
    hideError(confPasswordField);
  } else if (password.value !== confPasswordField.value) {
    confPasswordField.setCustomValidity(`Passwords do not match`);
    showError(confPasswordField);
  } else {
    confPasswordField.setCustomValidity("");
    hideError(confPasswordField);
  }
}

// todo
// ! not used
// * just for styling button
// if form is not ok, disable submit button
function validateAllFields() {
  const fields = [emailField, country, zipcode, password, confPasswordField];

  let hasFalse = false;

  fields.forEach((field) => {
    if (field.validity.valid === false) {
      hasFalse = true;
    }
  });

  // return true if all fields are valid || hasFalse == false
  return !hasFalse;
}

function setSubmitButton(_boolean) {
  if (_boolean) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", "true");
  }
}

window.onload = () => {
  document.getElementById("country").onchange = checkZIP;
  document.getElementById("zipcode").oninput = checkZIP;

  document.getElementById("password").oninput = checkPassword;
  document.getElementById("confPassword").onchange = checkConfPassword;

  // ! not used
  submitButton.addEventListener("click", () => {
    setSubmitButton(validateAllFields());
    console.log(`validate all fields: ${validateAllFields()}`);
  });
};
