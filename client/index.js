import http from 'http';
// import net from 'net';
// const net = require('net');
import url from 'url';

var Gun = require('gun/gun');

// TODO figure out how to get this file based on package.json config variable
import txt from '/Development-B/Roz/roz_well.txt';
console.log(txt);

const files = txt.split(/\r?\n/);

files.forEach(fileString => {
  const el = document.createElement('div');
  el.className = 'node';
  el.innerHTML = `<p>${fileString}</p>`;
  document.body.appendChild(el)
});

const gun = Gun();

gun.get('dave').put({
  name: 'Dave',
  email: 'Dave@Dave.com'
});

gun.get('dave').on((data, key) => {
  console.log(`update:`, data)
})