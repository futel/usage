'use strict';
const graph = require('./graph');

const phones = {
  "saratoga": "405",
  "hedron": "440",
  "central": "410",
  "breckenridge": "415",
  "cesar chavez": "420",
  "sjac": "435",
  "microcosm": "445",
  "clinton": "610",
  "robotron": "615",
  "souwester": "620",
  "upright": "625",
  "ypsi": "630",
  "alley27": "640",
  "paz": "645",
  "taylor": "655",
  "opensignal": "660",
  "oskar": "668",
  "r2d2": "670",
  "ainsworth": "680",
  "detroitbusco": "690",
  "eighth": "695",
  "demo": "700",
  "incoming-1": "voipms",
  "incoming-2": "twilio-termination",
  "incoming-3": "futel.pstn.twilio.com"
};
const chanToName = Object.fromEntries(
  Object.entries(phones).map(x => [x[1],x[0]])
);

function getSelect(){
  return document.getElementById('phone-list');
}

function init(){
  const list = getSelect();
  const allPhones = Object.entries(phones)
  allPhones.sort();
  allPhones.forEach(p => {
    const name = p[0];
    const ext = p[1];
    const option = document.createElement('option');
    option.value = ext;
    option.innerHTML = name;
    list.appendChild(option);
  });
  list.addEventListener('change', e => {
    graph.buildAndShow();
  })
}

function selectAll(){
  return selectHelper((text,value) => true);
}

function selectAllIncoming(){
  return selectHelper((text,value) => text.startsWith('incoming-'));
}

function selectHelper(predicate){
  const sel = getSelect();
  console.log(sel.options);
  Array.prototype.forEach.call(sel.options, opt => {
    opt.selected = predicate(opt.innerHTML, opt.value);
  });
  sel.dispatchEvent(new Event('change'));
}

// Returns the selected phones
function getSelectedPhones(){
  const result = {};
  const sel = getSelect();
  Array.prototype.forEach.call(sel.options, opt => {
    if(opt.selected){
      result[opt.innerHTML] = opt.value;
    }
  });
  return result;
}

function nameFromChannel(ch){
  return chanToName[ch];
}

function phonesAreCombined(){
  return document.getElementById('combine-phones').checked;
}

function selectChannels(channels){
  const sel = getSelect();
  Array.prototype.forEach.call(sel.options, opt => {
    opt.selected = channels.includes(opt.value);
  });
}

export {
  init,
  phones,
  selectAll,
  selectAllIncoming,
  getSelectedPhones,
  nameFromChannel,
  phonesAreCombined,
  selectChannels
}
