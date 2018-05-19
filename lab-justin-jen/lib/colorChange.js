'use strict';

function colorChange(buffer, callback) {
  buffer[54] = '0xFF';
  buffer[55] = '0xFF';
  buffer[56] = '0xFF';

  callback(buffer);
}

module.exports = colorChange;