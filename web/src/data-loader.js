'use strict';

//TODO: convert local to UTC?
// https://futel.github.io/usage/data/date/{year}/{month}.json
async function getRangeByMonth(start, end){
  const range = makeYearMonthRange(start, end);
  const padded = range.map(d => [d[0], `${d[1]}`.padStart(2, '0')]);
  const urls = padded.map(d => `data/date/${d[0]}/${d[1]}.json`);
  console.log(urls);
  const promises = urls.map(url =>
    fetch(url).then(resp => {
      // console.log(resp);
      return resp.ok ? resp.json() : [];
    })
  );
  return Promise.all(promises)
    .then(responses => {
      return responses.flatMap(r => r);
    });
}

async function getDataLastUpdated(){
  return fetch('data/last_updated.txt')
    .then(resp => {
      return resp.ok ? resp.text() : '';
    });
}

function makeYearMonthRange(start, end){
  let cur = new Date(`${start}T00:00:00Z`);
  const endDate = new Date(`${end}T23:59:59Z`);
  const result = [];
  result.push(yearMonth(cur));
  while(cur.getTime() < endDate.getTime()){
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

// https://futel.github.io/usage/data/event-list.json
async function getEventList(){
  return fetch('data/event-list.json')
        .then(resp => resp.ok ? resp.json() : []);
}

export {
  getRangeByMonth,
  getEventList,
  getDataLastUpdated
}
