
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

export {
  init
};
