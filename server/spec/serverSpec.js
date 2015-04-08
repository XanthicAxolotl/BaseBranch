var expect = require('chai').expect;
var request = require('supertest');
var Sequelize = require('sequelize');
var app = require('../serverSetup.js').app;
var db = require('../config/db_models.js');

beforeEach(function(done) {
  // clear out resource so that we can create it during testing
  db.sequelize.sync().then(function(){
    db.Resources.destroy({ where: { name: 'testresource' }})
    .then(function(affectedRows) {
      console.log('Deleted record from Resources table. Number of rows affected: ', affectedRows);
      done();
    });
  });

});

describe('', function() {

  describe('Basic Test', function() {
    it('should return 200', function (done) {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });
  });

  describe('Resources', function(){

    it('should create new resource and node, and get resources and node', function(done){

      var nodeId;
      //create Node for testing
      request(app)
        .post('/api/node')
        .send({
          'name':'testnode',
          'neighbor': 1
        })
        .expect(function(res){
          nodeId = res.body.id
          request(app)
            .post('/api/resource')
            .send({
              'name': 'testresource',
              'url': 'www.test.com',
              'type': 'website',
              'description': 'hello',
              'nodeId': nodeId
            })
            .expect(200)
            .expect(function(res){
              expect(res.body.name).to.equal('testresource');
              expect(res.body.nodeId).to.equal(nodeId);
            })
            .expect(function(res){
              request(app)
                .get('/api/node/resources/' + nodeId)
                .expect(function(res){
                  expect(Array.isArray(res.body)).to.equal(true);
                })
                .end()  
            })
            .end()
        })
        .expect(function(res){
          var nodeId = res.body.id
          request(app)
            .get('/api/node/' + nodeId)
            .expect(function(res){
              expect(res.body.id).to.equal(nodeId)
            })
            .end()
        })
        .end(done);

    });
  });

  // describe('Nodes', function(){
    
  //   it('should find node', function(done){

  //     //made node for testing
  //     request(app)
  //       .post('/api/node')
  //       .send({
  //         'name':'testnode',
  //         'neighbor': 1
  //       })
  //       .expect(function(res){
  //         var nodeId = res.body.id
  //         request(app)
  //           .get('/api/node/' + nodeId)
  //           .expect(function(res){
  //             expect(res.body.id).to.equal(nodeId)
  //           })
  //           .end()
  //       })
  //       .end(done);
  //   });
  // });
  
/*
  describe('Idea creation: ', function() {
    it('Responds with the created idea', function(done) {
      request(app)
        .post('/api/ideas')
        .send({
          'title': 'Test Idea 1',
          'text': 'This is a test.'
        })
        .expect(200)
        .expect(function(res) {
          expect(res.body.title).to.equal('Test Idea 1');
          expect(res.body.text).to.equal('This is a test.');
        })
        .end(done);
    });

    it('A new idea creates a database entry', function(done) {
      request(app)
        .post('/api/ideas')
        .send({
          'title': 'Test Idea 1',
          'text': 'This is a test.'
        })
        .expect(200)
        .expect(function(res) {
          Idea.findOne({'title' : 'Test Idea 1'})
            .exec(function(err, idea) {
              if (err) {
                console.log(err);
              }
              expect(idea.title).to.equal('Test Idea 1');
            });
        })
        .end(done);
    });
  });
*/
});
