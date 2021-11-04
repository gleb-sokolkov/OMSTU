const fs = require('fs');
const path = require('path');

const getTrimmedText = (filePath) => fs.readFileSync(filePath, 'utf-8').toString().replace(/^\s+|\s+$/g, '');

module.exports = getTrimmedText;
