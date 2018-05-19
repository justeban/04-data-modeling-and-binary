'use strict';

const fs = require('fs');

function changeHeight(buffer) {
  
  buffer[18] = '0xF0';
  buffer[22] = '0xF0';

  console.log(buffer);

  fs.writeFile(`./assets/demo.bmp`, buffer, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
  });
}

module.exports = changeHeight;