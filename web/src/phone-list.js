'use strict';
const graph = require('./graph');

const phones = {
  "saratoga": "405",
  "central": "410",
  "breckenridge": "415",
  "robotron": "615",
  "souwester": "620",
  "upright": "625",
  "ypsi": "630",
  "alley27": "640",
  "taylor": "655",
  "oskar": "668",
  "ainsworth": "680",
  "eighth": "695",
  "alleytwentyseventh": "alleytwentyseventh",
  "bottles and cans one": "bottles-and-cans-one",
  "bottles and cans two": "bottles-and-cans-two",
  "brazee": "brazee",
  "cesar chavez one": "cesar-chavez-one",
  "cesar chavez two": "cesar-chavez-two",
  "clinton": "clinton",
  "dome basement": "dome-basement",
  "dome booth": "dome-booth",
  "dome office": "dome-office",
  "fortysecond": "fortysecond",    
  "ghost mountain": "ghost-mountain",
  "groundscore one": "groundscore-one",
  "groundscore two": "groundscore-two",
  "hot-leet": "hot-leet",
  "landline": "landline",
  "microcosm": "microcosm",
  "princeton": "princeton",
  "r2d2": "r2d2",
  "sjac": "sjac",
  "street-roots-one": "street-roots-one",
  "system": "system",
  "twilio": "twilio",
  "incoming 1": "voipms",
  "incoming 2": "twilio-termination",
  "incoming 3": "futel.pstn.twilio.com"
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
