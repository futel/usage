'use strict';
const dates = require('./dates');
const phoneList = require('./phone-list');
const eventList = require('./event-list');
const ui = require('./ui');
const urlFoo = require('./url-foo');
const relDates = require('./reldates');
const title = require('./title');

console.log('futel usage start : index.js')

async function initAll(){
  dates.init();
  phoneList.init();
  await eventList.init();
  ui.init();
  urlFoo.init();
  ui.toggleSortByVizBasedOnAggType();
  relDates.init();
  title.init();
}

initAll();
