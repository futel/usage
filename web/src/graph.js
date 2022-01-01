
import * as dates from './dates';
import * as dataLoader from './data-loader';
import * as phoneList from './phone-list';


async function buildAndShow(){
  const start = dates.getStartDate();
  const end = dates.getEndDate();
  console.log(`graphing from ${start} to ${end}`);
  dataLoader.getRangeByMonth(start, end)
    .then(r => {
      console.log(r);
    });

}

export {
  buildAndShow
}
