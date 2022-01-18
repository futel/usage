'use strict';
import Litepicker from 'litepicker';

let picker;

function init(){
  picker = new Litepicker({
    singleMode: false,
    element: getStartElem(),
    elementEnd: getEndElem()
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
  picker.on('selected', cb);
}

export {
  init,
  getStartDate,
  getEndDate,
  setStartDate,
  setEndDate,
  setSelectedCb
};
