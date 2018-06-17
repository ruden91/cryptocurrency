const firebase = require('firebase');
const app = firebase.initializeApp({
  apiKey: 'AIzaSyCglOLO4Efb3TYF5F4WfdsoD4kbP41k7Kg',
  authDomain: 'cryptocurrency-c7083.firebaseapp.com',
  databaseURL: 'https://cryptocurrency-c7083.firebaseio.com',
  projectId: 'cryptocurrency-c7083',
  storageBucket: 'cryptocurrency-c7083.appspot.com',
  messagingSenderId: '733166686714'
});

module.exports = {
  firebase: firebase,
  auth: firebase.auth(),
  database: firebase.database()
};
