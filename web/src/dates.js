'use strict';
import Litepicker from 'litepicker';
const graph = require('./graph');

let picker;
let selectedCb;

function init(){
  picker = new Litepicker({
    singleMode: false,
    element: getStartElem(),
    elementEnd: getEndElem()
  });
  picker.on('selected', (start,end) => {
    if(selectedCb){
      graph.buildAndShow();
      selectedCb(start, end);
    }
  });
}

function getStartElem(){
  return document.getElementById('date-start');
}

function getEndElem(){
  return document.getElementById('date-end');
}

function getStartDate(){
  return getStartElem().value;
}

function getEndDate(){
  return getEndElem().value;
}

function setStartDate(date){
  return getStartElem().value = date;
}

function setEndDate(date){
  return getEndElem().value = date;
}

// cb should consume start/end dates
function setSelectedCb(cb){
  selectedCb = cb;
}

function haveDateRange(){
  const start = getStartDate();
  const end = getEndDate();
  return start.match(/^\d\d\d\d-\d\d-\d\d$/) &&
         end.match(/^\d\d\d\d-\d\d-\d\d$/) &&
         new Date(start) <= new Date(end);
}

export {
  init,
  getStartDate,
  getEndDate,
  setStartDate,
  setEndDate,
  setSelectedCb,
  haveDateRange
};
