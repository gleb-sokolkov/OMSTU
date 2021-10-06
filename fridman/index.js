/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const alphabet = require('../alphabet');

const filenames = fs.readdirSync(path.join(__dirname, 'input'));
const messages = filenames.map((t) => fs.readFileSync(path.join(__dirname, 'input', t)).toString('utf8'));
