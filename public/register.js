const elems = {
  form    : document.querySelector('form'),
  email   : document.querySelector('[name="email"]'),
  password: document.querySelector('[name="password"]'),
  confirm : document.querySelector('#confirm'),
  error   : document.querySelector('.error'),
};

/**
 * Shows an error element on the page containing the errors
 * @param {Object} errors
 * @return void
 */
const showErrors = (errors) => {
  elems.error.classList.remove('hidden');
  elems.error.innerHTML = '';

  for (let key in errors) {
    const div = document.createElement('div');
    div.textContent = errors[key];
    elems.error.append(div);
  }
};

const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return true
  return false;
};

elems.form.addEventListener('submit', event => {
  event.preventDefault();
  const errors = {};

  if (elems.password.value !== elems.confirm.value)
    errors.misMatch = 'Password dont match';
  if (elems.password.value.length < 6)
    errors.length = 'Password must be at least 6 characters';
  if (!validateEmail(elems.email.value))
    errors.email = 'Invalid email address';


  if (Object.keys(errors).length > 0)
    return showErrors(errors);

  elems.form.submit();
});
