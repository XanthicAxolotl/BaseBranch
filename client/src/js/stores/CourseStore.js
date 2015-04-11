/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');
var mui = require('material-ui');
var CourseActions = require('../actions/CourseActions.js');
var Toggle = mui.Toggle;

var _course = {};

// _course = {
//   name: 'Super Xanthic JavaScript Course',
//   description: 'Awesome JS Course made by Yellow Amphibians',
//   creator: 'Team Xanthic Axolotl',
//   updated: new Date().getDate(),
//   rating: 9001,
//   resources: [
//     {
//       id: 1,
//       name: 'How To Even',
//       rating: -20,
//       description: 'For those who cannot even',
//       url: 'http://www.howmetalisthis.com/notwiththatattitude',
//       type: 'blog',
//       isChecked: true
//     },
//     {
//       name: 'Hey, enough of the jokes, on to the real stuff!',
//       type: 'header',
//       isChecked: false
//     },
//     {
//       id: 2,
//       name: 'Codecademy JavaScript Course',
//       rating: 10,
//       description: 'Codecademy interactive JavaScript intro course',
//       url: 'http://www.codecademy.com',
//       type: 'interactive tutorial',
//       isChecked: false
//     },
//     {
//       id: 3,
//       name: "Kalev Roomann-Kurrik's Awesome Blog for People who want to Learn JavaScript",
//       rating: 99,
//       description: 'Super Awesome Blog that will turn you into a seafood-eating taichi master along the way!',
//       url: 'http://www.jasonchangloveskalev.com',
//       type: 'blog',
//       isChecked: false
//     },
//     {
//       id: 4,
//       name: "Recreating WendyCoin with JavaScript Objects",
//       rating: '4 (capped at the max # of wendycoins owned by a single person)',
//       description: "Learn how to clone the world's most exclusive woo-woo currency in JS",
//       url: 'http://www.coolcutecoughingcats.com/billysboots',
//       type: 'video',
//       isChecked: false
//     },
//     {
//       name: 'Sneaky, sneaky Recursions!',
//       type: 'header',
//       isChecked: false
//     },
//     {
//       id: 5,
//       name: "Wizarding Recursion JavaScript Magic",
//       rating: '9 3/4',
//       description: "Make your computer work recursions while you take lunch naps in the park",
//       url: 'http://www.isvoldemortaterrorist.com/marvelousriddles',
//       type: 'horcrux',
//       isChecked: false
//     }
//   ]

// };
/*================ CREATE CURRICULA STORE =================*/
var CourseStore = Reflux.createStore({
  listenables: CourseActions,
  init: function(){
    this.load();
  },
  triggerMe: function(){
    this.trigger(_course);
  },
  load: function(){
    // use this to get the curriculum data from the database
    var courseId = window.location.href.split('#')[1];
 
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/curriculum/" + courseId;
    if (courseId !== undefined && courseId.length > 0) {
    http.open("GET", url, true);
      http.onreadystatechange = function() {
        if (http.readyState === 4) {
          _course = JSON.parse(http.response);
          _course.resources = [];
          context.getResources();
        }
      };
    http.send();
    } else {
      window.location.replace('./');
    }
  },
  getResources: function(){
    var context = this;
    var http = new XMLHttpRequest();
    var url = "./api/curriculum/resource/" + _course.id;

    http.open("GET", url, true);
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        _course.resources = JSON.parse(http.response);
        context.trigger(_course);
      }
    };
    http.send();
  },
  onDownVote: function(resource){
    console.log('down');
  },
  onUpVote: function(resource) {
    console.log('up');
  },
  onTogglecheck: function(course) {
    console.log('toggle me silly');
  }
});

module.exports = CourseStore;