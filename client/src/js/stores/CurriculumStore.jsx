var Reflux = require('reflux');
var mui = require('material-ui');
var Toggle = mui.Toggle;


var CurriculumStore = Reflux.createStore({
  var _curricula = [];
  // color: "brown",
  // width: 900,
  // height: 560,
  // channelName: 'placeholderName',
  init: function(){
    this.load();
    // listen to curriculum actions here
    this.listenTo(CurriculumActions.loadCurricula, this.load);
    this.listenTo(CurriculumActions.editCurricula, this.onEdit);
  },
  load: function(){
    // use this to get the curricula data from the database
    var context = this;
    var xmlhttp = new XMLHttpRequest();
    var url = "https://branchbase.herokuapp.com/api/curriculumview";

    xmlhttp.open("GET", url, true);

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        _curricula = xmlhttp.response;
      }
    };

    xmlhttp.send(null);

  },
  pushChanges: function() {
    // use this to push updates to database
    // var context = this;
    // $.ajax({
    //   type: "POST",
    //   data: _jobs,
    //   url: '/api/listings',
    // }).done(function(data){
    //     console.log(data);
    //     context.trigger(_jobs);
    // });
  },
  onEdit: function(job) {
    // console.log("from onEdit in jobStore.jsx");
    // for (var i = 0; i < _jobs.length; i++) {
    //   if(_jobs[i]._id === job._id) {
    //     _jobs[i].mutable = job.mutable;
    //     this.trigger(_jobs);
    //     break;
    //   }
    // }
    // this.pushChanges();
  }
});

module.exports = CurriculumStore;
