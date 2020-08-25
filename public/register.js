'use strict';

const form = document.querySelector('form');

// TODO: DRY THIS UP
const showErrors = errors => {
  for (const key in errors) {
    for (const error of errors[key]) {
      document
        .querySelector(`[data-name="${key}"]`)
        .textContent += error;
    }
  }
};
// TODO: DRY THIS UP
form.addEventListener('submit', async event => {
  event.preventDefault();

  Array
    .from(document.querySelectorAll('.error'))
    .forEach(el => el.textContent = '');

  const email    = form.email.value;
  const password = form.password.value;

  try {
    const result = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();
    if (data.errors) return showErrors(data.errors);
    if (data.user)   return location.assign('/');
  }

  catch (err) {
    console.log('there was an error', err);
  }
});
