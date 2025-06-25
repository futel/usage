
import * as phoneList from './phone-list';
import * as graph from './graph';
import { getDataLastUpdated } from './data-loader';

function init(){
  document.getElementById('allphones').onclick = () => {
    phoneList.selectAll();
  }
  document.getElementById('allincoming').onclick = () => {
    phoneList.selectAllIncoming();
  }
  document.getElementById('graphit').onclick = () => {
    console.log('graphing it');
    graph.buildAndShow();
  }
  ['chartType', 'combine-phones', 'aggregate', 'showinactive', 'tsortby'].forEach(name => {
    document.getElementById(name).addEventListener('change', e => {
      graph.buildAndShow();
    });
  });
  toggleSortByVizBasedOnAggType();
  document.getElementById('aggregate').addEventListener('change', toggleSortByVizBasedOnAggType);
  getDataLastUpdated().then(date => { 
    document.getElementById('lastupdated').innerHTML = date;
  })

}

function toggleSortByVizBasedOnAggType(){
  const agg = document.getElementById('aggregate');
  if(agg.value === 'total'){
    uiShow('tsortbydiv');
  }
  else {
    uiHide('tsortbydiv');
  }
}

//attribution: https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function stringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

function uiShow(elemId){
  const elem = document.getElementById(elemId);
  elem.classList.remove('visually-hidden');
}

function uiHide(elemId){
  const elem = document.getElementById(elemId);
  elem.classList.add('visually-hidden');
}

// Returns true if we want to graph data for phones whose content is all zeroes
// for the given range
function wantInactivePhones(){
  return document.getElementById('showinactive').checked;
}

export {
  init,
  stringToColor,
  uiShow,
  uiHide,
  wantInactivePhones,
  toggleSortByVizBasedOnAggType
};
