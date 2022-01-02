'use strict';
const d = require('./data-loader');
const dates = require('./dates');
const phoneList = require('./phone-list');
const eventList = require('./event-list');
const ui = require('./ui');

console.log('futel usage start : index.js')

dates.init();
phoneList.init();
eventList.init();
ui.init();
