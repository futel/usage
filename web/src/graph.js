
import * as dates from './dates';
import * as dataLoader from './data-loader';
import * as phoneList from './phone-list';
import * as eventList from './event-list';
import * as aggregation from './aggregation';
import { stringToColor, uiShow, uiHide } from './ui';
import Chart from 'chart.js/auto';

let chart;

async function buildAndShow(){
  const start = dates.getStartDate();
  const end = dates.getEndDate();
  console.log(`graphing from ${start} to ${end}`);
  dataLoader.getRangeByMonth(start, end)
    .then(filterToSelectedPhones)
    .then(filterToSelectedEvents)
    .then(aggregation.aggregate)
    .then(data => {
      console.log(data);
      plot(data);
    });
}

function plot(data){
  uiHide('chartWrapper');
  if(chart){
    chart.destroy();
  }
  document.getElementById('totals').innerHTML = '';
  if(aggregation.getAggType() === 'total'){
    return showTotal(data);
  }
  uiShow('chartWrapper');
  const chartData = {
    labels: createLabels(data),
    datasets: createDatasets(data)
  };
  console.log(chartData);
  const config = {
    type: 'line',
    data: chartData,
    options: {}
  };
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(
    ctx,
    config
  );
}

function showTotal(data){
  const totalsDiv = document.getElementById('totals');
  const table = document.createElement('table');
  table.classList.add('fs-1')
  totalsDiv.appendChild(table);
  if(phoneList.phonesAreCombined()){
    table.innerHTML = `<tr><td>Total:</td><td class='px-4'>${data['total']}</td></tr>`;
    return;
  }
  uiShow('chartWrapper');
  const totals = Object.entries(Object.values(data)).map(p => p[1]['total']);
  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      label: 'total',
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: '#666666aa',
      data: totals
    }]
  };
  const config = {
    type: 'bar',
    data: chartData,
    options: {}
  };
  console.log(config);
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(
    ctx,
    config
  );
  
  Object.entries(data).forEach(p => {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const name = document.createElement('td');
    name.innerText = `${p[0]}:`;
    tr.append(name);
    const value = document.createElement('td');
    value.classList.add('px-4');
    value.innerText = p[1]['total'];
    tr.append(value);
  });
  // console.log(data);
}

function createDatasets(data){
  return Object.entries(data).map(e => {
    const name = e[0] === 'x' ? 'all phones' : e[0];
    return {
      label: name,
      borderColor: stringToColor(name),
      data: Object.values(e[1])
    };
  });
}

function createLabels(data){
  const firstEntry = Object.entries(data)[0];
  return Object.keys(firstEntry[1]);
}

function filterToSelectedPhones(data){
  const selectedPhones = phoneList.getSelectedPhones();
  const wanted = Object.values(selectedPhones).map(v => `SIP-${v}`);
  return data.filter(d => wanted.includes(d.channel));
}

function filterToSelectedEvents(data){
  const selectedEvents = eventList.getSelectedEvents();
  return data.filter(d => selectedEvents.includes(d.event));
}

export {
  buildAndShow
}
