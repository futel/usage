'use strict';
const d = require('./data-loader');
const dates = require('./dates');
const phoneList = require('./phone-list');
const ui = require('./ui');

console.log('hello from index.js')

dates.init();
phoneList.init();
ui.init();
