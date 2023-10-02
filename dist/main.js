/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("/* eslint-disable no-underscore-dangle */\n\nvar form = document.querySelector(\"form\");\nvar emailField = document.querySelector(\"#email\");\nvar country = document.querySelector(\"#country\");\nvar zipcode = document.querySelector(\"#zipcode\");\nvar password = document.querySelector(\"#password\");\nvar confPasswordField = document.querySelector(\"#confPassword\");\nvar submitButton = document.querySelector(\"submit\");\nemailField.addEventListener(\"input\", function () {\n  if (emailField.validity.typeMismatch) {\n    showError(emailField);\n    // emailField.setCustomValidity(\"I am expecting an email address!\");\n  } else {\n    hideError(emailField);\n    emailField.setCustomValidity(\"\");\n  }\n});\nfunction showError(field) {\n  field.validity.valid = false;\n  var errorSpan = document.querySelector(\"#\".concat(field.id, \"Error\"));\n  errorSpan.textContent = field.validationMessage;\n  errorSpan.classList.add(\"active\");\n}\nfunction hideError(field) {\n  field.validity.valid = true;\n  var errorSpan = document.querySelector(\"#\".concat(field.id, \"Error\"));\n  errorSpan.textContent = \"\";\n  errorSpan.classList.remove(\"active\");\n}\nfunction checkZIP() {\n  var ZIP = {\n    PH: [\"^\\\\d{4}$\", \"Use following format: NNNN\"],\n    CN: [\"^\\\\d{6}$\", \"Use the following format: NNNNNN\"],\n    TW: [\"^\\\\d{5}$\", \"Use the following format: NNNNN\"],\n    ID: [\"^\\\\d{5}$\", \"Use the following format: NNNNN\"]\n  };\n\n  // zipcode.setAttribute(\"placeholder\", ZIP[`${country}`][1]);\n\n  var constraint = new RegExp(ZIP[\"\".concat(country.value)][0], \"\");\n  if (zipcode.value == \"\") {\n    zipcode.setCustomValidity(\"\");\n    hideError(zipcode);\n  } else if (!constraint.test(zipcode.value)) {\n    zipcode.setCustomValidity(ZIP[\"\".concat(country.value)][1]);\n    showError(zipcode);\n  } else {\n    zipcode.setCustomValidity(\"\");\n    hideError(zipcode);\n  }\n}\nfunction checkPassword() {\n  console.log(password.value);\n\n  // todo make validator for password field\n\n  var uppercaseRegex = /^(?=.*[A-Z])/;\n  var lowercaseRegex = /^(?=.*[a-z])/;\n  var specialcaseRegex = /^(?=.*[!@#$%^&*()_+{}[\\]:;<>,.?~\\\\-])/;\n  var minLengthRegex = /^.{8,}$/;\n  var passwordConstraint = new RegExp(uppercaseRegex.source + lowercaseRegex.source + specialcaseRegex.source + minLengthRegex.source);\n\n  // const passwordConstraint = new RegExp(combinedRegex, \"\");\n\n  // * console.log(passwordConstraint.test(\"P@ssw0rd\"));\n  console.log(\"pw check: \".concat(passwordConstraint.test(password.value)));\n  var passIsOk = false;\n  function setConfPassAvailability(available) {\n    // available = true | false;\n    var confPassField = document.getElementById(\"confPassword\");\n    if (available === true) {\n      confPassField.removeAttribute(\"disabled\");\n    } else {\n      confPassField.setAttribute(\"disabled\", \"true\");\n    }\n  }\n\n  // todo show error if validity not matched\n  if (password.value == \"\") {\n    // if pass is empty\n    password.setCustomValidity(\"\");\n    hideError(password);\n    setConfPassAvailability(false);\n  } else if (!passwordConstraint.test(password.value)) {\n    // if password passes constraints\n    var checker = [uppercaseRegex.test(password.value), specialcaseRegex.test(password.value), lowercaseRegex.test(password.value)];\n    var missingCriteria = [];\n    if (!checker[0]) {\n      missingCriteria.push(\"1 uppercase letter\");\n    }\n    if (!checker[1]) {\n      missingCriteria.push(\"1 special case character\");\n    }\n    if (!checker[2]) {\n      missingCriteria.push(\"1 lowercase letter\");\n    }\n    if (missingCriteria.length > 0) {\n      password.setCustomValidity(\"Password must contain: \".concat(missingCriteria.join(\", \")));\n      showError(password);\n      setConfPassAvailability(false);\n    } else if (password.value.length < 8) {\n      // if password length is less than 8\n      password.setCustomValidity(\"Your password lacks \".concat(8 - password.value.length, \" characters\"));\n      showError(password);\n      setConfPassAvailability(false);\n    }\n  } else if (password.value.length < 8) {\n    // if password length is less than 8\n    password.setCustomValidity(\"Your password lacks \".concat(8 - password.value.length, \" characters\"));\n    showError(password);\n    setConfPassAvailability(false);\n  } else {\n    password.setCustomValidity(\"\");\n    hideError(password);\n    setConfPassAvailability(true);\n  }\n}\nfunction checkConfPassword() {\n  // if match, make fields green\n  // if not, make red\n  // if field is empty, make it normal\n\n  if (password.value === confPasswordField.value) {\n    confPasswordField.setCustomValidity(\"\");\n    hideError(confPasswordField);\n  } else if (confPasswordField.value === \"\") {\n    confPasswordField.setCustomValidity(\"\");\n    hideError(confPasswordField);\n  } else if (password.value !== confPasswordField.value) {\n    confPasswordField.setCustomValidity(\"Passwords do not match\");\n    showError(confPasswordField);\n  } else {\n    confPasswordField.setCustomValidity(\"\");\n    hideError(confPasswordField);\n  }\n}\n\n// todo\n// ! not used\n// * just for styling button\n// if form is not ok, disable submit button\nfunction validateAllFields() {\n  var fields = [emailField, country, zipcode, password, confPasswordField];\n  var hasFalse = false;\n  fields.forEach(function (field) {\n    if (field.validity.valid === false) {\n      hasFalse = true;\n    }\n  });\n\n  // return true if all fields are valid || hasFalse == false\n  return !hasFalse;\n}\nfunction setSubmitButton(_boolean) {\n  if (_boolean) {\n    submitButton.removeAttribute(\"disabled\");\n  } else {\n    submitButton.setAttribute(\"disabled\", \"true\");\n  }\n}\nwindow.onload = function () {\n  document.getElementById(\"country\").onchange = checkZIP;\n  document.getElementById(\"zipcode\").oninput = checkZIP;\n  document.getElementById(\"password\").oninput = checkPassword;\n  document.getElementById(\"confPassword\").onchange = checkConfPassword;\n\n  // ! not used\n  submitButton.addEventListener(\"click\", function () {\n    setSubmitButton(validateAllFields());\n    console.log(\"validate all fields: \".concat(validateAllFields()));\n  });\n};\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;