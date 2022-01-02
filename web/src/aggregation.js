'use strict';

const dates = require('./dates');
import * as phoneList from './phone-list';

const pad2 = x => `${x}`.padStart(2, '0');

const HOURLY = {
  next: d => new Date(d.getTime() +  1000 * 60 * 60),
  bucket: d => {
    const month = pad2(d.getUTCMonth()+1);
    const day = pad2(d.getUTCDate());
    const hour = pad2(d.getUTCHours());
    return `${d.getUTCFullYear()}-${month}-${day} ${hour}`;
  }
};
const DAILY = {
  next: d => new Date(d.getTime() +  1000 * 60 * 60 * 24),
  bucket: d => `${d.getUTCFullYear()}-${pad2(d.getUTCMonth()+1)}-${pad2(d.getUTCDate())}`
}
const MONTHLY = {
  next: d => {
    let result = d;
    while(result.getUTCMonth() === d.getUTCMonth()){
      result = new Date(result.getTime() +  1000 * 60 * 60 * 24);
    }
    return result;
  },
  bucket: d => `${d.getUTCFullYear()}-${pad2(d.getUTCMonth()+1)}`
}
const TOTAL = {
  next: d => 'total',
  bucket: d => 'total'
}

const AGGREGATORS = {
  hourly: HOURLY,
  daily: DAILY,
  monthly: MONTHLY,
  total: TOTAL
}

// Assumes data has been pre-filtered to
function aggregate(data){
  if(document.getElementById('combine-phones').checked){
    data = squashExtensions(data);
  }
  const type = getAggType();
  // const phones = new Set( data.map(d => d.channel))
  // console.log(phones);

  const startDate = dates.getStartDate();
  const endDate = dates.getEndDate();
  const result = Object.fromEntries(
    Object.keys(phoneList.getSelectedPhones())
      .map(phone => {
        const buckets = makeBuckets(type, startDate, endDate).map(b => [b,0]);
        return [phone, Object.fromEntries(buckets)];
      })
  );
  console.log(result);
  const agg = AGGREGATORS[type];
  data.forEach(event => {
    const ch = event.channel.replace(/^SIP-/, '');
    const name = phoneList.nameFromChannel(ch);
    const bucket = agg.bucket(new Date(event.timestamp))
    result[name][bucket] = result[name][bucket] + 1;
  });
  console.log(result);
  return data;
}

function makeBuckets(type, startDate, endDate){
  const agg = AGGREGATORS[type];
  const result = [];
  let cur = new Date(`${startDate}T00:00:00Z`);
  const e = new Date(`${endDate}T23:59:59Z`);
  while(agg.bucket(cur) !== agg.bucket(e)){
    result.push(agg.bucket(cur));
    const x = cur;
    cur = agg.next(cur);
  }
  result.push(agg.bucket(e));
  return result;
}

function getAggType(){
  return document.getElementById('aggregate').value;
}

function squashChannels(data){
  return data.map( d => d.channel = 'x');
}

export {
  aggregate
}
