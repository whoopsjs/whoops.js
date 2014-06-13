var tpm = require('./index');

var a = {
  hello: 'world',
  foo: 'bar',
  nwb: {
    klimaanlage: 'kaputt',
    'sinn des lebens': 42
  }
};

var b = {
  nwb: {
    klimaanlage: 'kaputt'
  },
  foo: 'bar'
};

var c = {
  nwb: {
    klimaanlage: 'heile'
  },
  foo: 'bar'
};

console.log(tpm.compare(a, b) === true);
console.log(tpm.compare(a, c) === false);