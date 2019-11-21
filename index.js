const { Worker } = require('worker_threads');
const { instances } = require('./config');

function startInstance() {
  const worker = new Worker('./worker.js');
  worker.on('message', msg => {
    console.log(msg);
  });
  worker.on('exit', code => {
    if (code !== 0) startInstance();
  });
  worker.on('error', error => {
    console.log(error);
  });
}

for (var i = 1; i <= instances; i++) startInstance();
