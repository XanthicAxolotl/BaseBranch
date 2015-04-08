var expect = require('chai').expect;
var request = require('supertest');
var Sequelize = require('sequelize');
var app = require('../serverSetup.js').app;
var db = require('../config/db_models.js');

before(function(done) {
  // clear out resource so that we can create it during testing
  db.sequelize.sync().then(function(){

    var channelId;

    db.Channels.findOrCreate({ where: { name: 'testchannel' }, defaults: {
      name: 'testchannel'
    }}).then(function(channel){
      console.log('Successfully created test channel for testing');
      channelId = channel.id;
      done();
    });

    db.Resources.destroy({ where: { name: 'testresource1' }})
    .then(function(affectedRows) {
      console.log('Deleted record from Resources table. Number of rows affected: ', affectedRows);
<<<<<<< Updated upstream
      done();
    });
=======
    })
    .then(function(){
      db.Resources.destroy({ where: { name: 'testresource2' }})
      .then(function(affectedRows) {
        console.log('Deleted record from Resources table. Number of rows affected: ', affectedRows);
      })
      .then(function(){
        db.Resources.destroy({ where: { name: 'testresource3' }})
        .then(function(affectedRows) {
          console.log('Deleted record from Resources table. Number of rows affected: ', affectedRows);
          done();
        })
      })

    })
>>>>>>> Stashed changes
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
              'name': 'testresource1',
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

<<<<<<< Updated upstream
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
=======
  describe('Curricula', function(){

    // create instances needed for testing curricula
    before(function(done){

      var channelId, nodeId, res1, res2, res3;

      // create channel for curricula testing
      db.Channels.create({
        name: 'testchannel'
      })
      .then(function(channel){
        channelId = channel.id;
        console.log('Created channel ', channelId);
      });

      // create node for curricula testing
      request(app)
        .post('/api/node')
        .send({
          'name':'testnode1',
          'neighbor': 1
        })
        .expect(function(res){
          nodeId = res.body.id
          console.log('Created node ', nodeId);
        })
        .end(function(err, res){
          console.log('Created node in Curricula before hook');
        });

      // create resource1 for curricula testing
      request(app)
        .post('/api/resource')
        .send({
          'name': 'testresource1',
          'url': 'www.test.com',
          'type': 'website',
          'description': 'hello',
          'nodeId': nodeId
        })
        .expect(function(res){
          res1 = res.body;
          console.log('Created res1: ', res1);
        })
        .end(function(err, res){
          console.log('Created resource1 in Curricula before hook');
        });

      // create resource2 for curricula testing
      request(app)
        .post('/api/resource')
        .send({
          'name': 'testresource2',
          'url': 'www.test.com',
          'type': 'website',
          'description': 'hello',
          'nodeId': nodeId
        })
        .expect(function(res){
          res2 = res.body;
          console.log('Created res2: ', res2);
        })
        .end(function(err, res){
          console.log('Created resource2 in Curricula before hook');
        });

      // create resource1 for curricula testing
      request(app)
        .post('/api/resource')
        .send({
          'name': 'testresource3',
          'url': 'www.test.com',
          'type': 'website',
          'description': 'hello',
          'nodeId': nodeId
        })
        .expect(function(res){
          res3 = res.body;
          console.log('Created res3: ', res3);
        })
        .end(function(err, res){
          console.log('Created resource3 in Curricula before hook');
          done();
        });
    });

    // clean up instances after finishing curricula testing
    after(function(done){
      db.sequelize.sync().then(function(){

      db.Channels.destroy({ where: { name: 'testchannel' }});

      db.Resources.destroy({ where: { name: 'testresource1' }})
      .then(function(affectedRows) {
        console.log('Deleted record from Resources table. Number of rows affected: ', affectedRows);
      })
      .then(function(){
        db.Resources.destroy({ where: { name: 'testresource2' }})
        .then(function(affectedRows) {
          console.log('Deleted record from Resources table. Number of rows affected: ', affectedRows);
        })
        .then(function(){
          db.Resources.destroy({ where: { name: 'testresource3' }})
          .then(function(affectedRows) {
            console.log('Deleted record from Resources table. Number of rows affected: ', affectedRows);
            done();
          })
        })

      })
  });
    });

    it('should create new curriculum', function(done) {

      console.log('Inside of curriculum tests');
      
      request(app)
        .post('/api/curriculum')
        .send({
          'name': 'testcurriculum',
          'description': 'This is a test curriculum.',
          'channelId': channelId,
          'resources': [res1,res2,res3]
        })
        .expect(200)
        .expect(function(res){
          expect(res.body.name).to.equal('testcurriculum');
          expect(res.body.description).to.equal('This is a test curriculum.');
          expect(res.body.channelId).to.equal(channelId);
        })
        .end(function(){
          done();
        });
    });
  });
>>>>>>> Stashed changes
  
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
