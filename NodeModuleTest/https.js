// Due to changes in both response and request files variables are changed as well
// const request = require('./request'); -> const { send } = require('./request');
// const response = require('./response'); -> const { read } = require('./response');

// this only works if you only want to use a single thing from file
// const { send } = require('./Yondu-Test-Files/NodeModuleTest/request'); 
// const read = require('./Yondu-Test-Files/NodeModuleTest/response');
// const { REQUEST_TIMEOUT } = require('./Yondu-Test-Files/NodeModuleTest/request'); 

// const internals = require('./NodeModuleTest');
const {send, read} = require('./internals');

function makeRequest(url, data) {
  send(url, data);
  return read();
}

const responseData = makeRequest('https://google.com', 'hello');
console.log(responseData);
