// module.exports = {
//   request: require('./request'),
//   response: require('./response'),
// }

module.exports = {
  ...require('./request'),
  ...require('./response'),
}
