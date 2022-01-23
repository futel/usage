'use strict';

const dates = require('./dates');
const phoneList = require('./phone-list');
const eventList = require('./event-list');
const graph = require('./graph');
const reldates = require('./reldates');

function init(){
  const phoneSel = document.getElementById('phone-list');
  phoneSel.addEventListener('change', updatePhoneSelection);
  const eventList = document.getElementById('event-list');
  eventList.addEventListener('change', updateEventSelection);
  document.getElementById('date-start').addEventListener('change', updateDates);
  document.getElementById('date-end').addEventListener('change', updateDates);
  dates.setSelectedCb(updateDates);
  const combine = document.getElementById('combine-phones');
  combine.addEventListener('change', e => {
    setOrDelete('c', combine.checked ? 1 : 0);
  });
  document.getElementById('aggregate').addEventListener('change', updateAggregation);
  bootstrapUrl();
}

// On init, if we have incoming params, set everything up
function bootstrapUrl(){
  const url = new URL(window.location.href);
  const phones = url.searchParams.get('p');
  if(phones){
    phoneList.selectChannels( phones.split('|'));
  }
  const events = url.searchParams.get('e');
  if(events){
    eventList.selectEvents(events);
  }
  const start = url.searchParams.get('start');
  if(start) dates.setStartDate(start);
  const end = url.searchParams.get('end');
  if(end) dates.setEndDate(end);
  const combined = url.searchParams.get('c');
  document.getElementById('combine-phones').checked = combined ? true : false;
  const a = url.searchParams.get('a');
  if(a){
    const agg = document.getElementById('aggregate');
    Array.prototype.forEach.call(agg.options, opt => {
      if(opt.value === a){
        opt.selected = true;
      }
    });
  }
  const r = url.searchParams.get('r');
  if(r){
    return reldates.setReldateExpr(r);
  }
  if(url.searchParams.toString()){
      graph.buildAndShow();
  }
}

function updateDates(){
  const startDate = document.getElementById('date-start');
  const endDate = document.getElementById('date-end');
  setOrDelete('start', startDate.value);
  setOrDelete('end', endDate.value);
  setOrDelete('r');
}

function setOrDelete(name, value){
  const currentUrl = new URL(window.location.href);
  if(value){
    currentUrl.searchParams.set(name, value);
  }
  else {
    currentUrl.searchParams.delete(name);
  }
  history.replaceState({}, '', currentUrl.toString());
}

function updatePhoneSelection(event){
  const selectedPhones = phoneList.getSelectedPhones();
  setOrDelete('p', Object.values(selectedPhones).join('|'));
}

function updateAggregation(event){
  const agg = document.getElementById('aggregate');
  Array.prototype.forEach.call(agg.options, opt => {
    if(opt.selected){
      return setOrDelete('a', opt.value);
    }
  });
}

function updateReldate(expr){
  setOrDelete('start');
  setOrDelete('end');
  setOrDelete('r', expr);
}

function updateEventSelection(event){
  const events = eventList.getSelectedEvents();
  console.log(events);
  setOrDelete('e', events.join('|'));
}

export {
  init,
  updateReldate
}
