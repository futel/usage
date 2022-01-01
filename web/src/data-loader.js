'use strict';

// https://futel.github.io/usage/data/date/{year}/{month}.json
async function getMonth(year, month){

}

//TODO: convert local to UTC?
async function getRangeByMonth(start, end){
  const range = makeYearMonthRange(start, end);
  const padded = range.map(d => [d[0], `${d[1]}`.padStart(2, '0')]);
  const urls = padded.map(d => `/usage/data/date/${d[0]}/${d[1]}.json`);
  console.log(urls);
}

function makeYearMonthRange(start, end){
  let cur = new Date(start);
  const endDate = new Date(end);
  const result = [];
  result.push(yearMonth(cur));
  while(cur.getTime() <= endDate.getTime()){
    const last = cur;
    cur = new Date(cur.getTime() +  1000 * 60 * 60 * 24);
    if(last.getUTCMonth() != cur.getUTCMonth()){
      result.push(yearMonth(cur));
    }
  }
  return result;
}

function yearMonth(date){
  return [ date.getUTCFullYear(), date.getUTCMonth() + 1];
}

export {
  getMonth,
  getRangeByMonth
}
