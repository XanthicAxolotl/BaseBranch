var expect = require('chai').expect;
var request = require('supertest');
var Sequelize = require('sequelize');
var app = require('../serverSetup.js').app;
var db = require('../config/db_models.js');

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
              console.log('res.body.name: ', res.body.name);
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

  describe('Curricula', function(){

    afterEach(function(done){
      db.Curricula.destroy({ where: { name: 'testcurriculum' }})
      .then(function(affectedRows){
        console.log('Deleted testcurriculum from DB. Rows affected: ', affectedRows);
        db.Resources.destroy({ where: { name: 'testresource1' }})
        .then(function(affectedRows){
          console.log('Deleted testresource1 from DB. Rows affected: ', affectedRows);
          db.Resources.destroy({ where: { name: 'testresource2' }})
          .then(function(affectedRows){
            console.log('Deleted testresource2 from DB. Rows affected: ', affectedRows);
            db.Resources.destroy({ where: { name: 'testresource3' }})
            .then(function(affectedRows){
              console.log('Deleted testresource3 from DB. Rows affected: ', affectedRows);
              db.Nodes.destroy({ where: { name: 'testnode1' }})
              .then(function(affectedRows){
                console.log('Deleted testnode1 from DB. Rows affected: ', affectedRows);
                db.Channels.destroy({ where: { name: 'testchannel' }})
                .then(function(affectedRows){
                  console.log('Deleted testchannel from DB. Rows affected: ', affectedRows);
                  done();
                });
              });
            });
          });
        });
      });
    });

    it('should create new curriculum', function(done) {

      console.log('Inside of curriculum tests');

      var channelId, nodeId, res1, res2, res3;

      db.sequelize.sync().then(function(){
        // create channel for curricula testing
        db.Channels.create({
          name: 'testchannel'
        })
        .then(function(channel){
          channelId = channel.id;
          console.log('Created channel ', channelId);
          
          db.Nodes.create({
            name: 'testnode1',
            neighbor: 1
          })
          .then(function(node){
            nodeId = node.id;
            console.log('Created node ', nodeId);

            db.Resources.create({
              name: 'testresource1',
              url: 'www.test1.com',
              type: 'tutorial',
              description: 'This is a test resource.',
              nodeId: nodeId
            })
            .then(function(resource){
              res1 = resource;
              console.log('Created resource ', resource.name);

              db.Resources.create({
                name: 'testresource2',
                url: 'www.test2.com',
                type: 'tutorial',
                description: 'This is a test resource.',
                nodeId: nodeId
              })
              .then(function(resource){
                res2 = resource;
                console.log('Created resource ', resource.name);

                db.Resources.create({
                  name: 'testresource3',
                  url: 'www.test3.com',
                  type: 'tutorial',
                  description: 'This is a test resource.',
                  nodeId: nodeId
                })
                .then(function(resource){
                  res3 = resource;
                  console.log('Created resource ', resource.name);
                  
                  // send the request to create the new curriculum
                  request(app)
                    .post('/api/curriculum')
                    .send({
                      'name': 'testcurriculum',
                      'description': 'This is a test curriculum.',
                      'channelId': channelId,
                      'resources': [res1.id,res2.id,res3.id]
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
            });
          });
        });
      });
      
    });

  });
  
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
