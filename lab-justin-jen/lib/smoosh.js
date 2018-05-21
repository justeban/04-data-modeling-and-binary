'use strict';

function smoosh(buffer, callback) {
  buffer[18] = '0xF0';
  callback(buffer);
}

module.exports = smoosh;