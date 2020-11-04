/**
 * - Validate data entry (age is required and > 0, relationship is required)
 * - Add people to a growing household list
 * - Reset the entry form after each addition
 * - Remove a previously added person from the list
 * - Display the household list in the HTML as it is modified
 * - Serialize the household as JSON upon form submission as a fake trip to the server
 */

// your code goes here ...
const ageInput = document.querySelector('input[name="age"]');
const relationshipDropdown = document.querySelector('select[name="rel"]');
const smokerCheckbox = document.querySelector('input[name="smoker"]');
const form = document.querySelector("form");
const addButton = document.querySelector("button.add");
const submitButton = document.querySelector('button[type="submit"]');
const householdList = document.querySelector("ol.household");
addButton.disabled = true;
submitButton.disabled = true;

// Validate form entries on form change.
ageInput.addEventListener("change", () => {
  validate("ageInput");
});
relationshipDropdown.addEventListener("change", () => {
  validate("relationshipDropdown");
});

/**
 * Validate HTML element.
 *
 * @param {String} item The name of the HTMLElement to validate.
 */
function validate(item) {
  switch (item) {
    case "ageInput":
      // Check for previous validation errors and reset.
      const ageError = document.querySelector("input + span.error");
      resetError(ageError);
      // Validate.
      if (isNaN(parseInt(ageInput.value))) {
        createErrorMessage(
          ageInput,
          `Must be a valid number ("${ageInput.value}" entered).`
        );
      } else if (parseInt(ageInput.value) <= 0) {
        createErrorMessage(
          ageInput,
          `Must be greater than 0 ("${ageInput.value}" entered).`
        );
      }
      break;
    case "relationshipDropdown":
      // Check for previous validation errors and reset.
      const relationshipError = document.querySelector("select + span.error");
      resetError(relationshipError);
      // Validate.
      if (relationshipDropdown.value.length === 0) {
        createErrorMessage(relationshipDropdown, `Required`);
      }
      break;
  }
}

/**
 * Create Validation Error Message.
 *
 * @param {String} formItem The item to validate.
 * @param {String} message The error message to display.
 */
function createErrorMessage(formItem, message) {
  const element = document.createElement("span");
  element.classList.add("error");
  const textContent = document.createTextNode(`${message}`);
  return formItem
    .insertAdjacentElement("afterend", element)
    .appendChild(textContent);
}

/**
 * Check if there is error.
 *
 * @param {HTMLElement} element The HTML element.
 * @returns {Bool} true|false True if error, false otherwise.
 */
function error(element) {
  return element && element.length !== 0 ? true : false;
}

/**
 * Remove error message.
 * Removes previous error message, if any, prior to new validation.
 *
 * @param {HTMLElement} element The target HTML element.
 */
function resetError(element) {
  if (error(element)) {
    element.remove();
  }
}

// Enable/disable button
form.addEventListener("change", () => {
  if (
    document.querySelectorAll("span.error").length > 0 ||
    ageInput.value === "" ||
    relationshipDropdown.value === ""
  ) {
    addButton.disabled = true;
    submitButton.disabled = true;
  } else {
    addButton.disabled = false;
    submitButton.disabled = false;
  }
});

// Add household items.
let household = [];
let id = 0;
addButton.addEventListener("click", (e) => {
  e.preventDefault();

  household.push({
    id: id,
    age: ageInput.value,
    relationship: relationshipDropdown.value,
    smoker: smokerCheckbox.checked ? "yes" : "no",
  });

  console.log(household);

  householdList.innerHTML += `<li data-id=${household[id].id}>Age: ${household[id].age}, relationship: ${household[id].relationship}, smoker: ${household[id].smoker} <span data-id=${household[id].id} class="delete">❌</span></li>`;

  id++;
  form.reset();
  addButton.disabled = true;
});

householdList.addEventListener(
  "click",
  () => {
    document.querySelector("span.delete").addEventListener("click", () => {
      const id = document.querySelector("span.delete").getAttribute("data-id");
      document.querySelector(`li[data-id="${id}"]`).remove();
    });
  },
  true
);

// Remove household items.
// document.querySelector("span.delete").addEventListener("click", () => {
//   const id = document.querySelector("span.delete").getAttribute("data-id");
//   document.querySelector(`li[data-id="${id}"]`).remove();
// });

// Submit household items and display list.
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // household.map((item) => {
  //   householdList.innerHTML += `<li data-id=${item.id}>Age: ${item.age}, relationship: ${item.relationship}, smoker: ${item.smoker} <span data-id=${item.id} class="delete">❌</span></li>`;
  // });
  form.reset();
  ageInput.disabled = true;
  relationshipDropdown.disabled = true;
  smokerCheckbox.disabled = true;
  submitButton.disabled = true;
});

const style = document.createElement("style");
style.innerHTML = `
:root {
    --desktop-font-size: 1.3rem/1.5;
    --text-small: 11px;
    --text-color: #2d2d2d;
    --link-color: blue;
    --primary-color: black;
    --secondary-color: orangered;
    --tertiary-color: yellowgreen;
}
body {
  color: var(--text-color);
}
body, input {
  font: var(--desktop-font-size) -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto, Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol";
  margin: 120px;
}
h1,h2,h3,h4,h5,h6,p,blockquote,dl,img,figure {
  margin: 2rem 0;
  display: block;
}
h1,h2,h3,h4,h5,h6 { 
  font-weight: bold; 
  line-height: 1.2; 
  color: var(--secondary-color); 
}
h1 { font-size: 200%; }
h2 { font-size: 150%; }
h3 { font-size: 120%; }
h4,h5,h6 { font-size: 100%; }
h5, h6 { text-transform: uppercase; }
p { margin: 2rem 0; }
a,a:visited { color: var(--link-color); }
kbd,code,samp,pre,var { font-family: monospace; font-weight: bold; }
code, pre {
    background: var(--tertiary-color);
    padding: 0.5rem 1rem;
}
code pre , pre code { padding: 0; }
ul, ol { margin: 2rem 0; padding: 0 0 0 4rem; }
input { 
    border: 1px solid var(--text-color);
    margin: 0.5rem 0;
}
input:focus, input:active { border-color: var(--link-color); }
form {
  border: solid 6px var(--primary-color);
  border-radius: 4px;
  padding: 20px 60px;
}
button {
  padding: 20px 60px;
  margin: 8px;
  text-transform: uppercase;
  border: solid 4px black;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
}
button[type="submit"] {
  background-color: var(--secondary-color);
}
button.add {
  background-color: var(--tertiary-color);
}
.error {
  color: var(--secondary-color);
  font-size: var(--text-small);
  font-weight: bold;
  margin: 0 4px;
}
`;
document.head.appendChild(style);
