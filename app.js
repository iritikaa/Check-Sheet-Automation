// csvReporter.js
const fs = require('fs');
const csvWriter = require('csv-writer');

class CSVReporter {
  constructor(filename) {
    this.filename = filename;
  }

  async write(data) {
    const csv = csvWriter.createObjectCsvWriter({
      path: this.filename,
      header: [
        { id: 'name', title: 'Name' },
        { id: 'age', title: 'Age' },
      ],
    });

    await csv.writeRecords(data);
  }
}

module.exports = CSVReporter;
