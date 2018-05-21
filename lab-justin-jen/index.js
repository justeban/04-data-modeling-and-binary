'use strict';

// input-file-path output-file-path transfrom-name
const fs = require('fs');
const smoosh = require('./lib/smoosh.js');
const colorChange = require('./lib/colorChange.js');

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const transformation = process.argv[4];

const parsedBitMap = {};

// const buffer = fs.readFile(inputFile, parseBitMap(err,data));
const buffer = fs.readFile(inputFile, (err, data) => {
  if(err) {throw err}

  if (transformation === 'smoosh') {
    smoosh(data, writeFile);
  } else if (transformation === 'colorChange') {
    colorChange(data, writeFile);
  }
  
  // parseBitMap(data);
});

// parse binary data
// Create a callback function that will parse the data
function parseBitMap(data) {

  const FILE_SIZE_OFFSET = 2;
  const WIDTH_OFFSET =  18;
  const HEIGHT_OFFSET = 22;
  const NUM_COLORS_OFFSET = 46;
  const COLOR_TABLE_OFFSET = 54;
  const BYTES_PER_PIXEL_OFFSET = 28;
  
  parsedBitMap.type = data.toString('utf-8', 0 , 2)
  parsedBitMap.fileSize = data.readInt32LE(FILE_SIZE_OFFSET);
  parsedBitMap.bytesPerPixel = data.readInt16LE(BYTES_PER_PIXEL_OFFSET)
  parsedBitMap.height = data.readInt32LE(HEIGHT_OFFSET);
  parsedBitMap.width = data.readInt32LE(WIDTH_OFFSET);
  parsedBitMap.numColors = data.readInt32LE(NUM_COLORS_OFFSET);
  let COLOR_TABLE_SIZE = parsedBitMap.numColors * 4;
  parsedBitMap.colorTable = data.slice(COLOR_TABLE_OFFSET, COLOR_TABLE_SIZE);

  console.log(parsedBitMap.colorTable);
}
// define tranformations

// write it out to a file
function writeFile(buffer) {
  fs.writeFile(`./assets/${outputFile}`, buffer, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

