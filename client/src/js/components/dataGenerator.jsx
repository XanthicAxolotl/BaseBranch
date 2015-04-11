var cuid = require('cuid');
var React = require('react');
var GraphStore = require('../stores/GraphStore.jsx');

var X_MIN = 1;
var X_MAX = 20;
var Y_MIN = 10;
var Y_MAX = 70;
var Z_MIN = 9;
var Z_MAX = 10;

var ns = {};

// plan:
// n is currently just a number passed in
// have n be the data
// for loop goes from i to n.length - 1
// get data from n and place in appropriate spots in generate datum

ns.generate = function(n) {
  var res = [];
  for (var i = 0; i < n; i++) {
   res.push(this.generateDatum([X_MIN, X_MAX], i));
  }
  return res;
};

ns.generateDatum = function(domain, i) {
  // console.log(GraphStore.nodeData);
  return {
    id: this._uid(),
    name: GraphStore.nodeData[i].name, //'asdf Name',
    nodeLink: GraphStore.nodeData[i].nodeLink, //'http://google.com',
    x: GraphStore.nodeData[i].x, //this._randomIntBetween(domain[0], domain[1]),
    y: GraphStore.nodeData[i].y, //this._randomIntBetween(Y_MIN, Y_MAX),
    z: 10,
  };
  // return {
  //   id: this._uid(),
  //   name: 'asdf Name',
  //   nodeLink: 'http://google.com',
  //   x: this._randomIntBetween(domain[0], domain[1]),
  //   y: this._randomIntBetween(Y_MIN, Y_MAX),
  //   z: this._randomIntBetween(Z_MIN, Z_MAX),
  // };
  // return {
  //   id: this._uid(),
  //   name: /*GraphStore.nodeData[n].name, */'asdf Name',
  //   nodeLink: /*GraphStore.nodeData[n].nodeLink, */'http://google.com',
  //   x: /*GraphStore.nodeData[n].x,*/this._randomIntBetween(domain[0], domain[1]),
  //   y: /*GraphStore.nodeData[n].y, */this._randomIntBetween(Y_MIN, Y_MAX),
  //   z: /*GraphStore.nodeData[n].z, */this._randomIntBetween(Z_MIN, Z_MAX),
  // };
};

ns._randomIntBetween = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

ns._uid = function() {
  return cuid();
};

module.exports = ns;
