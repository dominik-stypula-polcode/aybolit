const fs = require('fs');
const path = require('path');

const scssProcess = (mix, inputPath, outputPath) => {
  const files = fs.readdirSync(inputPath);
  files.forEach(file => {
    if (path.extname(file) === '.scss' && !path.basename(file).match(/^_/g)) {
      mix.sass(`${inputPath}/${file}`, outputPath);
    }
  });
};

module.exports = scssProcess;
