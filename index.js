/*eslint-env node */
/*eslint no-console: off*/

const requirejs = require('requirejs');

requirejs.config({nodeRequire: require});

requirejs(['./service-start'], (start)=>{
  start();
});
