

let socket = null;
let connected = false;

console.log('client ws starting.');

doConnect();

function doConnect(){

  socket = new WebSocket('ws://localhost:8080/client');

  socket.addEventListener('open', event => {
    console.log('ws connection established');
    connected = true;
  });

  socket.addEventListener('message', onMessage);

  socket.addEventListener('close', event => {
    console.log('ws disconnected');
    socket = null;
    showSignOffline();
    doConnect();
  });

}

function onMessage(event){
  // console.log('Message from server ', event.data);
  const message = JSON.parse(event.data);
  if(message.event === "status"){
    doStatusUpdate(message);
  }
}

function doStatusUpdate(message){
  if(message.online){
    showSignOnline();
  }
  else {
    showSignOffline();
  }
  updateDisplay(message.content);
}

function updateDisplay(content){
  if(isDragging) return; //busy painting here

  const buff = atob(content); //base64 decode
  for(let row=0; row < 7; row++){
    for(let rowbyte=0; rowbyte < 19; rowbyte++){
      const b = buff.charCodeAt((19*row) + rowbyte);
      for(let bp = 0; bp < 8; bp++){
        const col = (8 * rowbyte) + bp;
        const col_adj = col - 6;
        if((col_adj < 0) || (col_adj > 144)) continue;
        if((rowbyte == 0) && (bp < 8)) continue;
        if(b & (1 << bp)){
          ledOn(col_adj, row);
        }
        else{
          ledOff(col_adj, row);
        }
      }
    }
  }
}

function sendSingleLed(col, row, onOff){
  const cmd = onOff ? 'on' : 'off';
  return socket.send(`c:${cmd} ${col} ${row}\r\n`);
}

function clearSign(){
  socket.send('c:clear\r\n');
}

let txtChngTmr = null;
let lastTxt = '';

function onTextTyped(event){
  const inp = document.getElementById('realtext');
  if(event.keyCode === 8){
    if((inp.selectionStart !== 0) || (inp.selectionEnd !== inp.value.length)){
      event.preventDefault();
      return;
    }
  }
  if(txtChngTmr){
    clearTimeout(txtChngTmr);
  }
  txtChngTmr = setTimeout(() => {
    console.log('okey timed');
    console.log(`last value: ${lastTxt}`);
    console.log(`cur value: ${inp.value}`);
    if(inp.value === ''){
      socket.send('c:clear');
    }
    else if(inp.value.length < lastTxt){ // shorter

    }
    else {
      const newPart = inp.value.substr(lastTxt.length);
      console.log(`newpart: ${newPart}`);
      socket.send(`c:rin '${newPart}'`);
    }
    lastTxt = inp.value;
  }, 100);
}

function clearRealText(){
  document.getElementById('realtext').value = '';
  lastTxt = '';
}

function cmdargsKey(event){
  if(event.keyCode === 13){
    // enter pressed
    console.log('Enter pressed!');
  }
}
