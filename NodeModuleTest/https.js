/* Due to changes in both response and request files variables are changed as well
const request = require('./request'); -> const { send } = require('./request');
const response = require('./response'); -> const { read } = require('./response');
*/

// this only works if you only want to use a single thing from file
const { send } = require('./request'); 
const read = require('./response');

function makeRequest(url, data) {
  send(url, data);
  return read();
}

const responseData = makeRequest('https://google.com', 'hello');
console.log(responseData);
