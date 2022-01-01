'use strict';
const d = require('./data-loader');
const dates = require('./dates');
const phoneList = require('./phone-list');
const ui = require('./ui');

console.log('futel usage start : index.js')

dates.init();
phoneList.init();
ui.init();
