const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/pets.json');
const backupPath = path.join(__dirname, '../data/pets-backup.json');

function saveJSON(json) {
  const content = JSON.stringify(json);
  fs.writeFileSync(dataPath, content);
}

function getJSON() {
  const content = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(content);
}

function restore() {
  const backup = fs.readFileSync(backupPath, 'utf8');
  fs.writeFileSync(dataPath, backup);
}

module.exports = {saveJSON, getJSON, restore};