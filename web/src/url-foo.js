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
  document.getElementById('showinactive').addEventListener('change', updateShowInactive);
  document.getElementById('aggregate').addEventListener('change', updateAggregation);
  document.getElementById('chartType').addEventListener('change', updateChartType);
  document.getElementById('tsortby').addEventListener('change', updateSortBy);
  document.getElementById('title-edit').addEventListener('change', updateTitle);
  bootstrapUrl();
}

// On init, if we have incoming params, set everything up
function bootstrapUrl(){
  const url = new URL(window.location.href);
  const phones = url.searchParams.get('p');
  if(phones){
    phoneList.selectChannels(phones.split('|'));
  }
  const events = url.searchParams.get('e');
  if(events){
    eventList.selectEvents(events.split('|'));
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
  const c = url.searchParams.get('chart');
  if(c){
    const ct = document.getElementById('chartType');
    Array.prototype.forEach.call(ct.options, opt => {
      if(opt.value === c){
        opt.selected = true;
      }
    });
  }
  const sb = url.searchParams.get('sb');
  if(sb){
    const sortby = document.getElementById('tsortby');
    Array.prototype.forEach.call(sortby.options, opt => {
      if(opt.value === a){
        opt.selected = true;
      }
    });
  }
  const si = url.searchParams.get('si');
  if(si === "true"){
    document.getElementById('showinactive').checked = true;
  }
  const t = url.searchParams.get('t');
  if(t){
    document.getElementById('title-edit').value = t;
    document.getElementById('graphtitle').innerText = t;
    document.title = `FUTEL - ${t}`;
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

function updateChartType(event){
  const ct = document.getElementById('chartType');
  Array.prototype.forEach.call(ct.options, opt => {
    if(opt.selected){
      return setOrDelete('chart', opt.value);
    }
  });
}

function updateSortBy(){
  const agg = document.getElementById('tsortby');
  Array.prototype.forEach.call(agg.options, opt => {
    if(opt.selected){
      return setOrDelete('sb', opt.value);
    }
  });
}

function updateTitle(){
  const t = document.getElementById('title-edit');
  setOrDelete('t', t.value);
  document.title = `FUTEL - ${t.value}`;
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

function updateShowInactive(event){
  const v = document.getElementById('showinactive').checked;
  setOrDelete('si', v);
}

export {
  init,
  updateReldate
}
