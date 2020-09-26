'use strict';

const con = new WebSocket('ws://127.0.0.1:3001');
const chatBox = document.querySelector('.messages');
const chatInput = document.querySelector('#chat-input');

const cookieParser = () => {
  const result = {};
  document
    .cookie
    .replace(' ', '')
    .split(';')
    .forEach(c => {
      const pieces = c.split('=');
      result[pieces[0]] = pieces[1];
    });

  return result;
};
const cookies = cookieParser();
const jwt = cookies.jwt;

con.onmessage = response => {
  const parsed = JSON.parse(response.data);
  const div = document.createElement('div');
  div.textContent = `<${parsed.user}> ${parsed.msg}`;
  chatBox.append(div);
};

con.onopen = () => {
  console.log('Websocket connection established!');
};

chatInput.addEventListener('keydown', function(event) {
  if (event.keyCode !== 13) return;
  const msg = this.value;
  con.send(JSON.stringify({ msg, jwt }));
  this.value = '';
});
