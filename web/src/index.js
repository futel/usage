'use strict';
const d = require('./data-loader');
const dates = require('./dates');
const phoneList = require('./phone-list');

console.log('hello from index.js')

dates.init();
phoneList.init();
