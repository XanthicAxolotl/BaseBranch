var Reflux = require('reflux');
var mui = require('material-ui');
var Toggle = mui.Toggle;


var GraphStore = Reflux.createStore({
  color: "brown",
  width: 900,
  height: 560,
  channelName: 'placeholderName',
  init: function(){
    this.load();
    // listen to graph actions here
    // this.listenTo(JobActions.loadJobs, this.load)
    // this.listenTo(JobActions.createJob, this.onCreate);
    // this.listenTo(JobActions.editJob, this.onEdit);
  },
  load: function(){
    // use this to get the graph data from the database
    // var context = this;
    //   $.ajax({
    //     type: "GET",
    //     url: '/api/listings',
    //   }).done(function(data){
    //       console.log(data);
    //       _jobs = [data]; //push data to store
    //       context.trigger(_jobs);
    //   });
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
  onCreate: function(job) {
    // _jobs.push(job);
    // this.trigger(_jobs);
    // this.pushChanges();
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
  },

  getJobs: function() {
    // this.load(); //req to /api/listings
    // return _jobs;
  },

  getJob: function(id) {
    // for (var i = 0; i < _jobs.length; i++) {
    //   if(_jobs._id === id) {
    //     return jobs[i];
    //   }
    // }
  }
});

module.exports = GraphStore;
