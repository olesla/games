const con = new WebSocket('ws://127.0.0.1:8080');
const messages = document.querySelector('.messages');
const message = document.querySelector('.message');

con.onerror = error => {
  console.error('Connection could not be established :(', error);
};

con.onmessage = response => {
  const div = document.createElement('div');
  div.innerText = response.data;
  messages.prepend(div);
};

message.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    con.send(message.value);
    this.value = '';
  }
});
