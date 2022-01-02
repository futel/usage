'use strict';
import Litepicker from 'litepicker';

function init(){
  const picker = new Litepicker({
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

export {
  init,
  getStartDate,
  getEndDate
};
