'use strict';
import Litepicker from 'litepicker';

function init(){
  console.log("dates init");
  const picker = new Litepicker({
    singleMode: false,
    element: document.getElementById('date-start'),
    elementEnd: document.getElementById('date-end')
  });
}

export {
  init
};
