const form = document.querySelector('.register-form') as HTMLFormElement;

form.addEventListener('submit', async function (e: Event) {
  e.preventDefault();

  const email: string = this.email.value;
  const password: string = this.password.value;

  try {
    const result = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();
    // if (data.errors) return showErrors(data.errors);
    if (data.user)   return location.assign('/');
  }

  catch (err) {
    console.log('there was an error', err);
  }
});
