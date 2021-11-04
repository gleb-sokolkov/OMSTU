/* eslint-disable max-len */
/* eslint-disable object-property-newline */

const fs = require('fs');
const path = require('path');

const charsToReplace = {
  а: 'о', б: 'б', в: 'ш', г: 'й', д: 'ж', е: 'к', ж: 'л', з: 'э',
  и: 'щ', й: 'р', к: 'у', л: 'я', м: 'ч', н: 'н', о: 'п', п: 'г',
  р: 'м', с: 'ю', т: 'е', у: 'ц', ф: 'а', х: 'ф', ц: 'в', ч: 'ь',
  ш: 'х', щ: 'и', ы: 'с', ь: 'ы', э: 'т', ю: 'з', я: ' ', ' ': 'д',
};

const alphabet = 'абвгдежзийклмнопрстуфхцчшщыьэюя '.split('');
const inputText = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').toString().replace(/^\s+|\s+$/g, '');
const charArray = inputText.split('');
const freq = alphabet.reduce((acc, t) => {
  acc[t] = +((inputText.split(t).length - 1) / inputText.length).toFixed(4);
  return acc;
}, {});
const replacedChars = charArray.map((ch) => charsToReplace[ch]).join('');
console.log(freq, replacedChars);
