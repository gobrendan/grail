var path = require('path');
var sassTrue = require('sass-true');

var sassFile = path.join(__dirname, '../assets/css/style.scss');
sassTrue.runSass({file: sassFile}, describe, it);

console.log("hey!");