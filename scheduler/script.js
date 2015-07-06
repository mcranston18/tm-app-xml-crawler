var CronJob = require('cron').CronJob;
// var notifier = require('../notifier/script.js');
var scrapper = require('../scrapper/xmlScrapper.js');

// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11
// Day of Week: 0-6
const scheduler = () => {
  new CronJob('120 * * * * *', () => {
    scrapper()
      .then(data => console.log(data))
      .catch(() => new Error('Problem with scraper'))

  }, null, true, 'America/Los_Angeles');
}


module.exports = scheduler;
