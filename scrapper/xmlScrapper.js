const parseString = require('xml2js').parseString;
const request = require('request');
const q = require('q');

const events = [
  {name: 'run the jewels', id: '1000514DE842CBE4'},
  {name: 'thundercat', id: '10005182CB7AABDB'},
  {name: 'cold war kids', id: '100051873E94EED9'},
];

const event = events[0];
const url = `http://www.ticketmaster.ca/app/availability/${event.id}`;

const scraper = function() {
  let deferred = q.defer();

  request(url, function (error, response, body) {
    if (error) {
      deferred.reject('Request error.');
    }

    parseString(body, function (err, result) {
      if (err) {
        deferred.reject('Parse error.');
      }

      let eventResults = result.xml.tmol[0];

      if (!eventResults || !eventResults.availability_open_seats[0]) {
        deferred.reject('Problem with return object.', eventResults);
      }

      if (eventResults.availability_open_seats[0] === '0') {
        deferred.resolve(`${event.name}: No open seats.`)
      } else {
        deferred.resolve('Probably open seats.')
      }
    });
  });

  return deferred.promise;
}


module.exports = scraper;
