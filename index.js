const request = require('request');
const moment = require('moment');
const Table = require('table');

const DEBUG = process.env.DEBUG || false;
const API_URL = 'http://data.sfgov.org/resource/bbb8-hzi6.json';
const API_APP_TOKEN = 'YGgA1sJI8ub86tejN3LOMadiQ';

let page = 1;
if (process.argv.length > 2) {
  const parsed = Number.parseInt(process.argv[2]);
  if (!Number.isNaN(parsed)) {
    page = process.argv[2];
  }
}

// Note this is time-zone dependent that uses the local time zone.
// If run the command from EST 9:00am, it will use 9:00am to search
const now = moment();

request({
    uri: API_URL,
    headers: {
      'X-App-Token': API_APP_TOKEN
    },
    json: true,
    qs: {
      $select: 'applicant, location' + (DEBUG ? ', starttime, endtime' : ''),
      $where: whereClause(now),
      $order: 'applicant, location',
      $limit: 10,
      $offset: (page - 1) * 10
    }
  }, (error, response, body) => {
    if (error !== null) {
      console.log('There was an error retrieving data from the API. Please check your Internet connection.');
      return;
    }

    if (!body.length) {
      console.log('No result found');
      return;
    }

    // applicant, location
    let headers = ['NAME', 'ADDRESS'];
    if (DEBUG) {
      headers.push('START TIME');
      headers.push('END TIME');
    }

    let data = body.reduce((acc, cur) => {
      let row = [cur.applicant, cur.location];
      if (DEBUG) {
        row.push(cur.starttime);
        row.push(cur.endtime);
      }
      acc.push(row);
      return acc;
    }, [headers]);

    console.log(Table.table(data));
  });


function formatTime(time) {
  let hour = time.hour();
  if (hour < 10) {
    hour = '0' + hour;
  }

  let minute = time.minute();
  if (minute < 10) {
    minute = '0' + minute
  }
  return hour + ':' + minute;
}

function whereClause(time) {
  let dayOfWeek = time.day();
  let time24 = formatTime(time);

  return 'dayorder = ' + dayOfWeek +
    ' and start24 <= "' + time24 + '"' + 
    ' and end24 >= "' + time24 + '"';
}