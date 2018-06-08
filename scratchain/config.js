var fs = require('fs');
path = require('path'),    

config_path = path.join(__dirname, 'configuration.json');

const config = JSON.parse(fs.readFileSync(config_path, 'utf8'));

module.exports = { config }