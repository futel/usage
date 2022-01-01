
import * as dates from './dates';
import * as dataLoader from './data-loader';
import * as phoneList from './phone-list';


async function buildAndShow(){
  const start = dates.getStartDate();
  const end = dates.getEndDate();
  console.log(`graphing from ${start} to ${end}`);
  dataLoader.getRangeByMonth(start, end)
    .then(filterToSelectedPhones)
    .then(data => {
      console.log(data);
    });

}

function filterToSelectedPhones(data){
  const selectedPhones = phoneList.getSelectedPhones();
  const wanted = Object.values(selectedPhones).map(v => `SIP-${v}`);
  return data.filter(d => wanted.includes(d.channel));
}

export {
  buildAndShow
}
