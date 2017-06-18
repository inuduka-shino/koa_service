/*eslint-env node */
const fs=require('fs');

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {readFilePromise,};
