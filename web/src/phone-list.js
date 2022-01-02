'use strict';

const phones = {
  "tishbite": "505",
  "jesse": "510",
  "breckenridge": "515",
  "cesar chavez": "520",
  "hedron": "550",
  "clinton": "610",
  "robotron": "615",
  "souwester": "620",
  "upright": "625",
  "ypsi": "630",
  "mykle": "640",
  "paz": "645",
  "taylor": "655",
  "opensignal": "660",
  "oskar_in": "667",
  "oskar": "668",
  "r2d2": "670",
  "xnor": "680",
  "detroitbusco": "690",
  "hoyt": "695",
  "demo": "700"
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
}

function selectAll(){
  const sel = getSelect();
  console.log(sel.options);
  Array.prototype.forEach.call(sel.options, opt => {
    opt.selected = true;
  });
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

export {
  init,
  phones,
  selectAll,
  getSelectedPhones,
  nameFromChannel,
  phonesAreCombined
}
