/*eslint-env node */
/*eslint no-console: 0 */

//const gph001 = require('../gph_001/');;

const requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['./test2'], (test2)=>{
  // const test2 = require('./test2');

  console.log('test');
  console.log(test2());

});
// import gph001 from './apps/test.js';

//console.log(gph001);
