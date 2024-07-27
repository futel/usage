const ui = require('./ui');

function init(){
  document.getElementById('edit-title-link').onclick = () => {
    startEditTitle()
  }
}

function startEditTitle(){
  const titleText = document.getElementById('graphtitle').innerText
  ui.uiHide('graphtitle')
  ui.uiHide('edit-text-icon')
  ui.uiShow('title-edit')
  const ed = document.getElementById('title-edit');
  ed.value = titleText;
  ed.focus();
  ed.select();
  ed.onkeydown = textAreaInputChange;
}

function textAreaInputChange(e){
  if(e.keyCode == 13){
    console.log('saving title');
    const ed = document.getElementById('title-edit');
    document.getElementById('graphtitle').innerText = ed.value;
    ui.uiHide('title-edit');
    ui.uiShow('graphtitle');
    ui.uiShow('edit-text-icon');
  }
  else if(e.keyCode == 27){
    unedit();
  }
}

function unedit(){
  const old = document.getElementById('graphtitle').innerText;
  document.getElementById('title-edit').value = old;
  ui.uiHide('title-edit');
  ui.uiShow('graphtitle');
  ui.uiShow('edit-text-icon');
}

export {
  init,
  startEditTitle
}
