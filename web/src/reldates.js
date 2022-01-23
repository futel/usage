'use strict';
const dates = require('./dates');
import {MS_PER_HOUR, MS_PER_DAY, MS_PER_WEEK } from './util';
const urlFoo = require('./url-foo');
const graph = require('./graph');

let timer;

function init(){
  const input = getInput();
  input.addEventListener('input', inputChanged);
}

function inputChanged(e){
  if(timer){
    clearTimeout(timer);
    timer = null;
  }
  timer = setTimeout(handleNewValue, 200);
}

function getInput(){
  return document.getElementById('date-rel');
}

function handleNewValue(){
  const value = getInput().value.trim().toLowerCase();
  const err = document.getElementById('reldate-err');
  err.innerText = '';
  if(!validate(value)){
    err.innerText = 'invalid/unrecognized format';
    return;
  }
  const [x, num, suffix] = value.match(/^-(\d+)\s*([hdwmy])$/);
  const end = new Date();
  const start = computeStart(end, parseInt(num), suffix);
  console.log(`relative: ${dates.formatUTC(start)} -> ${dates.formatUTC(end)}`)
  dates.setStartDate(dates.formatUTC(start));
  dates.setEndDate(dates.formatUTC(end));
  urlFoo.updateReldate(value);
  graph.buildAndShow();
}

function computeStart(end, num, suffix){
  switch(suffix){
    case 'h': return new Date(end.getTime() - (num*MS_PER_HOUR));
    case 'd': return new Date(end.getTime() - (num*MS_PER_DAY));
    case 'w': return new Date(end.getTime() - (num*MS_PER_WEEK));
    case 'm':
      const result = new Date(end.getTime());
      result.setMonth(end.getMonth()-num); // oh javascript, wow
      return result;
  }
}

function validate(value){
  return value.match(/^-\d+\s*[hdwmy]$/);
}

function setReldateExpr(expr){
  getInput().value = expr;
  handleNewValue();
}

export {
  init,
  setReldateExpr
}
