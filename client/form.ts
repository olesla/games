class Form {
  el: HTMLFormElement;
  inputs: object;

  constructor(el: HTMLFormElement, inputs: object) {
    this.el = el;
    this.inputs = inputs;

    this.el.addEventListener('submit', async function (e: Event) {
      e.preventDefault();

      Array
        .from(document.querySelectorAll('.error'))
        .forEach(el => el.textContent = '');

      const email    = this.email.value;
      const password = this.password.value;

      try {
        const result = await fetch('/register', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await result.json();
        if (data.errors) return this.showErrors(data.errors);
        if (data.user)   return location.assign('/');
      }

      catch (err) {
        console.log('there was an error', err);
      }
    });
  }

  showErrors(errors: object) {}

  clearErrors() {
    Array
      .from(this.el.querySelectorAll('.error'))
      .forEach(el => el.textContent = '');
  }
}
