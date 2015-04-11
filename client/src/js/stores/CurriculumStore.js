/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var mui = require('material-ui');
var Toggle = mui.Toggle;
var CurriculumActions = require('../actions/CurriculumActions.js');

var _curricula = [];

_curricula = [{
                  id: '1',
                  name: 'Super Xanthic Curriculum!',
                  desc:'Example Framework 1',
                  author:'Xanthic Axolotl',
                  src:'http://www.walmart.com',
                  update: new Date().getDate,
                  rating: 20,
                  resources: [{id: 1, name: 'Super Awesome Javascript Blog!'}]
                },
                {
                  id: '2',
                  name: 'Super Xanthic Curriculum!',
                  desc:'Example Framework 1',
                  author:'Xanthic Axolotl',
                  src:'http://www.walmart.com',
                  update: new Date().getDate,
                  rating: 20,
                  resources: [{id: 1, name: 'Super Awesome Javascript Blog!'},
                              {id: 2, name: 'Super Awesome Javascript Blog!'},
                              {id: 3, name: 'Super Awesome Javascript Blog!'},
                              {id: 4, name: 'Super Awesome Javascript Blog!'},
                              {id: 5, name: 'Super Awesome Javascript Blog!'},
                              {id: 6, name: 'Super Awesome Javascript Blog!'},
                              {id: 7, name: 'Super Awesome Javascript Blog!'},
                              {id: 8, name: 'Super Awesome Javascript Blog!'}]
                }];
/*================ CREATE CURRICULA STORE =================*/
var CurriculumStore = Reflux.createStore({
  listenables: CurriculumActions,
  init: function(){
    this.load();
  },
  triggerMe: function(){
    this.trigger(_curricula);
  },
  getCurricula: function(){
    return _curricula;
  },
  load: function(){
    // use this to get the curricula data from the database
    console.log('hi');
    var context = this;
    var http = new XMLHttpRequest();
    var url = "http://localhost:8000/api/channel/curricula/JavaScript";

    http.open("GET", url, true);
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        console.log(http.response);
        _curricula = http.response;
        //this.trigger(_curricula);
      }
    };
    http.send();
  },
  pushChanges: function(curriculum) {
    var http = new XMLHttpRequest();
    var url = "https://branchbase.herokuapp.com/api/curriculumview";
    var context = this;

    http.open("POST", url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        context.trigger(_curricula);
      }
    };
    http.send(JSON.stringify(curriculum));
  },
  onChangeFramework: function(){
    this.load();
  },
  onUpVote: function(itemId){
    console.log('up', itemId);
  },
  onDownVote: function(itemId){
    console.log('down', itemId);
  }
});

module.exports = CurriculumStore;
