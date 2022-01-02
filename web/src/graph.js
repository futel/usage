
import * as dates from './dates';
import * as dataLoader from './data-loader';
import * as phoneList from './phone-list';
import * as eventList from './event-list';
import * as aggregation from './aggregation';

async function buildAndShow(){
  const start = dates.getStartDate();
  const end = dates.getEndDate();
  console.log(`graphing from ${start} to ${end}`);
  dataLoader.getRangeByMonth(start, end)
    .then(filterToSelectedPhones)
    .then(filterToSelectedEvents)
    .then(aggregation.aggregate)
    .then(data => {
      console.log(data);
    });
}

function filterToSelectedPhones(data){
  const selectedPhones = phoneList.getSelectedPhones();
  const wanted = Object.values(selectedPhones).map(v => `SIP-${v}`);
  return data.filter(d => wanted.includes(d.channel));
}

function filterToSelectedEvents(data){
  const selectedEvents = eventList.getSelectedEvents();
  return data.filter(d => selectedEvents.includes(d.event));
}

export {
  buildAndShow
}
