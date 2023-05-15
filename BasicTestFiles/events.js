const EventEmitter = require('events');
const celebrity = new EventEmitter();

// Subscribe to celebrity for Observer 1
celebrity.on('race win',()=> {
  console.log('Congratulations! You won first place!');
});

// Subscribe to celebrity for Observer 2
celebrity.on('race win',()=> {
  console.log('We will win next time!');
});

// Upon ending code
process.on('exit', () => {
  console.log('Code initialized successfully!');
});

celebrity.emit('race win');
celebrity.emit('race lost');