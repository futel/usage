'use strict';

const MS_PER_HOUR = 1000 * 60 * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;
const MS_PER_WEEK = MS_PER_DAY * 7;

const pad2 = x => `${x}`.padStart(2, '0');

export {
  pad2,
  MS_PER_HOUR,
  MS_PER_WEEK,
  MS_PER_DAY
}
