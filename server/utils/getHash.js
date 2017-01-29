/** Basically a Promise wrapper for the hash-files node package */

const hashFiles = require('hash-files');

const getHash = filename => new Promise((resolve, reject) => {

  hashFiles({ files: [filename] }, (err, hash) => {
    if (err) { reject(err)  }
    else { resolve(hash); }
  });

})

export default getHash;