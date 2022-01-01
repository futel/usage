
import * as phoneList from './phone-list';

function init(){
  document.getElementById('allphones').onclick = () => {
    console.log(phoneList);
    phoneList.selectAll();
  }
}

export {
  init
};
