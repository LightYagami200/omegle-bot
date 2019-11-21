const Omegle = require('omegle-node');
const _ = require('lodash');
const { msgs, inviteLink, interests } = require('./config');
const om = new Omegle();

om.on('omerror', function(err) {
  console.log('Error: ' + err);
});

om.on('waiting', function() {
  console.log('Waiting for a stranger.');
});

om.on('connected', function() {
  console.log('Connected');
  om.send(_.sample(msgs).replace('$', inviteLink));
  om.disconnect();
});

om.on('disconnected', function() {
  console.log('You have disconnected.');
  om.connect(interests);
});

om.connect(interests);
