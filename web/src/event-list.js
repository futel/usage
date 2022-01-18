'use strict';

import * as dataLoader from './data-loader';

async function init(){
  const events = await dataLoader.getEventList();
  events.sort();
  const sel = document.getElementById('event-list');
  events.forEach(event => {
    const option = document.createElement('option');
    option.value = event;
    option.innerHTML = event;
    sel.appendChild(option);
  });
}

// Returns the selected events
function getSelectedEvents(){
  const result = [];
  const sel = document.getElementById('event-list');
  Array.prototype.forEach.call(sel.options, opt => {
    if(opt.selected){
      result.push(opt.value);
    }
  });
  return result;
}

function selectEvents(events){
  const sel = document.getElementById('event-list');
  Array.prototype.forEach.call(sel.options, opt => {
    opt.selected = events.includes(opt.value);
  });
}


export {
    init,
    getSelectedEvents,
    selectEvents
}
