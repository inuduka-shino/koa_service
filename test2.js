/*eslint-env node */
/*eslint no-console: 0 */
/*global define */


console.log('define module 2');

define((require) => {
  const http = require('http');

  console.log('define module 2-2');

  return () => {
    console.log(typeof http);
    console.log(http.STATUS_CODES['301']);
    console.log('test module 2');

    return 'return module 2';

  };
});
