
import * as phoneList from './phone-list';
import * as graph from './graph';

function init(){
  document.getElementById('allphones').onclick = () => {
    console.log(phoneList);
    phoneList.selectAll();
  }
  document.getElementById('graphit').onclick = () => {
    console.log('graphing it');
    graph.buildAndShow();
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

export {
  init,
  stringToColor,
  uiShow,
  uiHide,
};
