
import * as dates from './dates';
import * as dataLoader from './data-loader';
import * as phoneList from './phone-list';
import * as eventList from './event-list';
import * as aggregation from './aggregation';
import { stringToColor, uiShow, uiHide, wantInactivePhones } from './ui';
import Chart from 'chart.js/auto';

let chart;

async function buildAndShow(){
  if(!dates.haveDateRange()){
    return console.log('NOT GRAPHING (no date range)');
  }
  const start = dates.getStartDate();
  const end = dates.getEndDate();
  console.log(`graphing from ${start} to ${end}`);
  let data = await dataLoader.getRangeByMonth(start, end);
  data = stripUnwantedMilliseconds(data);
  data = normalizeEndpoint(data);
  data = filterToSelectedPhones(data);
  data = filterToSelectedEvents(data);
  data = aggregation.aggregate(data);
  data = filterAllZeroPhones(data);
  console.log(data);
  if(Object.keys(data).length === 0){
    uiHide('chartWrapper');
    const totalsDiv = document.getElementById('totals');
    totalsDiv.innerHTML = '<h2>no data (nothing)</h2>';
    return;
  }
  plot(data);
}

// Get user's chart type preference from the control.
function getChartType() {
  const chartTypeElement = document.getElementById('chartType');
  return chartTypeElement ? chartTypeElement.value : 'line';
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


  const chartType = getChartType();
  const config = {    
    type: chartType,
    data: chartData,

    options: {
      scales: chartType === 'bar' ? {
        x: { stacked: true },
        y: { stacked: true }
      } : {}
    }
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

  // convert to tuple [name,total]
  const tots = Object.entries(data).map(p => ([p[0],p[1]['total']]));

  const sb = document.getElementById('tsortby').value;
  if(sb === 'count'){
    tots.sort( (a,b) => b[1] - a[1]);
  }

  const labels = tots.map(p => p[0]);
  const totals = tots.map(p => p[1]);

  const chartData = {
    labels: labels,
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

  tots.forEach(p => {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const name = document.createElement('td');
    name.innerText = `${p[0]}:`;
    tr.append(name);
    const value = document.createElement('td');
    value.classList.add('px-4');
    value.innerText = p[1];
    tr.append(value);
  });
}

function createDatasets(data){
  // datasetsWithTotals: data with 'total' property for decorated sorting.
  const datasetsWithTotals = Object.entries(data).map(e => {
    const name = e[0] === 'x' ? 'all phones' : e[0];
    const values = Object.values(e[1]);
    const total = values.reduce((sum, val) => sum + val, 0);
    const color = stringToColor(name);
    
    return {
      label: name,
      borderColor: color,
      backgroundColor: color,   // For bar charts.
      data: values,
      total: total // For sorting.
    };
  });
  
  // Sort by total, descending.
  datasetsWithTotals.sort((a, b) => b.total - a.total);
  
  // Remove the sort property and return.
  return datasetsWithTotals.map(dataset => {
    const { total, ...datasetWithoutTotal } = dataset;
    return datasetWithoutTotal;
  });
}

function createLabels(data){
  const firstEntry = Object.entries(data)[0];
  return Object.keys(firstEntry[1]);
}

function stripUnwantedMilliseconds(data){
  return data.map(d => {
    d.timestamp = d.timestamp.replace(/,\d\d\d/, '');
    return d;
  });
}

function normalizeEndpoint(data){
  return data.map(d => {
    if(Object.hasOwn(d, 'endpoint')) {
      return d;
    }
    d.endpoint = d.channel;
    return d;
  });
}

// Return a copy of data filtered to values which map to phoneList selected values.
// Values are mapped by prefixing 'SIP-', 'PJSIP-', or nothing.
function filterToSelectedPhones(data){
  const selectedPhones = phoneList.getSelectedPhones();
  const wanted = Object.values(selectedPhones).flatMap(v => [v, `SIP-${v}`, `PJSIP-${v}`]);
  return data.filter(d => wanted.includes(d.endpoint));
}

// Return a copy of data filtered to eventList selected values.
function filterToSelectedEvents(data){
  const selectedEvents = eventList.getSelectedEvents();
  return data.filter(d => selectedEvents.includes(d.event));
}

function filterAllZeroPhones(data){
  if(wantInactivePhones()) return data;
  const pairs = Object.entries(data);
  const filtered = pairs.filter(([phone,dateToCount]) => {
    const counts = Object.values(dateToCount);
    const sum = counts.reduce((prev,cur) => prev + cur);
    return sum > 0;
  });
  return Object.fromEntries(filtered);
}

export {
  buildAndShow
}
