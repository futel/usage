'use strict';

const dates = require('./dates');
import * as phoneList from './phone-list';
import { pad2, MS_PER_DAY } from './util';

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
  next: d => addDay(d),
  bucket: d => dates.formatUTC(d)
}
const MONTHLY = {
  next: d => {
    let result = d;
    while(result.getUTCMonth() === d.getUTCMonth()){
      result = addDay(result);
    }
    return result;
  },
  bucket: d => `${d.getUTCFullYear()}-${pad2(d.getUTCMonth()+1)}`
}
const WEEKLY = {
  next: d => {
    let result = addDay(d);
    while(result.getUTCDay() != 0){
      result = addDay(result);
    }
    return result;
  },
  bucket: d => {  //weekly buckets to previous sunday
    while(d.getUTCDay() != 0){
      d = subtractDay(d);
    }
    return dates.formatUTC(d);
  }
}
const TOTAL = {
  next: d => 'total',
  bucket: d => 'total'
}

const AGGREGATORS = {
  hourly: HOURLY,
  daily: DAILY,
  weekly: WEEKLY,
  monthly: MONTHLY,
  total: TOTAL
}

function addDay(date){
  return new Date(date.getTime() +  MS_PER_DAY);
}

function subtractDay(date){
  return new Date(date.getTime() - MS_PER_DAY);
}

// Assumes data has been pre-filtered to only the desired channels + event types
function aggregate(data){
  const type = getAggType();
  if(phoneList.phonesAreCombined()){
    if(type === 'total'){
      return { 'total': data.length };
    }
    data = squashChannels(data);
  }

  const result = stubZeroBuckets(type);
  const agg = AGGREGATORS[type];
  data.forEach(event => {
    const ch = event['channel'].replace(/^(PJ)?SIP-/, '');
    const name = phoneList.phonesAreCombined() ? 'x' : phoneList.nameFromChannel(ch);
    const bucket = agg.bucket(new Date(event['timestamp']))
    if(bucket in result[name]){
      result[name][bucket] = result[name][bucket] + 1;
    }
  });
  // console.log(result);
  return result;
}

function stubZeroBuckets(type){
  const startDate = dates.getStartDate();
  const endDate = dates.getEndDate();
  const phoneNames = phoneList.phonesAreCombined() ? ['x'] : Object.keys(phoneList.getSelectedPhones());
  return Object.fromEntries(
    phoneNames.map(phone => {
      const buckets = makeBuckets(type, startDate, endDate).map(b => [b,0]);
      return [phone, Object.fromEntries(buckets)];
    })
  );
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
  return data.map( d => {
    d['channel'] = 'x';
    return d;
  });
}

export {
  aggregate,
  getAggType
}
