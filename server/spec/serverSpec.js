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

    var nodeId, resourceId;

    beforeEach(function(done){
      db.sequelize.sync().then(function(){
          db.Nodes.create({
            name: 'testnode1',
            neighbor: 1
          })
          .then(function(node){
            nodeId = node.id;
            console.log('Created node ', nodeId);
            db.Resources.create({
              name: 'testresource',
              url: 'www.test.com',
              type: 'website',
              description: 'hello',
              nodeId: nodeId
            })
            .then(function(resource){
              resourceId = resource.id;
              console.log('Created resource ', resource.id);
              done();
            });
          });
      });
    });

    afterEach(function(done){
        db.Resources.destroy({ where: { name: 'testresource' }})
        .then(function(affectedRows){
          console.log('Deleted testresource from DB. Rows affected: ', affectedRows);
            db.Resources.destroy({ where: { name: 'testresource1' }})
            .then(function(affectedRows){
              console.log('Deleted testresource1 from DB. Rows affected: ', affectedRows);
              db.Nodes.destroy({ where: { name: 'testnode1' }})
              .then(function(affectedRows){
                console.log('Deleted testnode1 from DB. Rows affected: ', affectedRows);
                done();
              });
            });
        });
    });

    it('should create a new resource', function(done){
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
          expect(res.body.name).to.equal('testresource1');
          expect(res.body.nodeId).to.equal(nodeId);
        })
        .end(done);
    });

    it('should retrieve an existing resource', function(done){
      request(app)
        .get('/api/resource/' + resourceId)
        .expect(200)
        .expect(function(res){
          expect(res.body.name).to.equal('testresource');
          expect(res.body.nodeId).to.equal(nodeId);
        })
        .end(done);
    });
  });

  describe('Nodes', function(){
    var nodeId,
        resourceId,
        resourceName = 'testresource',
        nodeName = 't3stn0d3';

    beforeEach(function(done){
      db.sequelize.sync().then(function(){
        done();
      });
    });

    after(function(done){
      db.Nodes.destroy({ where: { name: nodeName }})
      .then(function(affectedRows){
        console.log('Deleted testnode from DB. Rows affected: ', affectedRows);
        db.Resources.destroy({where: {name: resourceName }})
        .then(function(affectedRows){
          console.log('Deleted testresource from DB. Rows affected: ', affectedRows);
          done();
        })
      });
    });

    it('should create a new node', function(done){
      request(app)
        .post('/api/node')
        .send({
          'name':nodeName
        })
        .expect(200)
        .expect(function(res){
          nodeId = res.body.id;
          expect(res.body.name).to.equal(nodeName);
        })
        .end(done);
    });

    it('should retrieve existing node', function(done){
      request(app)
        .get('/api/node/' + nodeId)
        .expect(200)
        .expect(function(res){     
          expect(res.body.name).to.equal(nodeName);
        })
        .end(done);
    });

    it('should be able to create resource with nodeId', function(done){
      request(app)
        .post('/api/resource')
        .send({
          'name': resourceName,
          'url': 'test.com',
          'type': 'app',
          'description': 'test',
          'nodeId': nodeId
        })
        .expect(200)
        .expect(function(res){
          resourceId = res.body.id;
          expect(res.body.nodeId).to.equal(nodeId);
        })
        .end(done);
    })

    it('should retrieve all resources belonging to node', function(done){
      request(app)
        .get('/api/node/resources/' + nodeId)
        .expect(200)
        .expect(function(res){
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].id).to.equal(resourceId);
        })
        .end(done);
    });
  });

  describe('Channels', function(){
    var channelName = 'testchannel',
        nodeName = 'testnode',
        curriculumName = 'testcurriculum';

    beforeEach(function(done){
      db.sequelize.sync().then(function(){
        done();
      });
    });

    before(function(done){
      db.Channels.create({
        name: channelName
      })
      .then(function(channel){
        channelId = channel.id;
        console.log('Created channel for testing Channels');
        done();
      })
    });

    after(function(done){
      db.Channels.destroy({where: {name: channelName}})
      .then(function(affectedRows){
        console.log('Deleted testchannel from DB. Rows affected: ', affectedRows);
        db.Curricula.destroy({where: {name: curriculumName }})
        .then(function(affectedRows){
          console.log('Deleted testcurriculum from DB. Rows affected: ', affectedRows);
          db.Nodes.destroy({where: { name: nodeName }})
          .then(function(affectedRows){
            console.log('Deleted testnode from DB. Rows affected: ', affectedRows);
            done();
          });
        });
      });
    });

    it('should create node with channelId', function(done){
      request(app)
        .post('/api/node')
        .send({
          'name': nodeName,
          'channelId': channelId
        })
        .expect(200)
        .expect(function(res){
          console.log(res.body)

          expect(res.body.channelId).to.equal(channelId);
        })
        .end(done);
    });

    it('should create curricula with channelId', function(done){
      request(app)
        .post('/api/curriculum')
        .send({
          'name': curriculumName,
          'description': 'testing for channel',
          'channelId': channelId,
          'resources': []
        })
        .expect(200)
        .expect(function(res){
          expect(res.body.channelId).to.equal(channelId);
        })  
        .end(done);
    });

    it('should get all nodes for channel', function(done){
      request(app)
        .get('/api/channel/nodes/' + channelName)
        .expect(200)
        .expect(function(res){
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].name).to.equal(nodeName)
        })
        .end(done);
    });

    it('should get all curricula for channel', function(done){
      request(app)
        .get('/api/channel/curricula/' + channelName)
        .expect(200)
        .expect(function(res){
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].name).to.equal(curriculumName);
        })
        .end(done);
    });

  });

  describe('Curricula', function(){

    var channelId, nodeId, res1, res2, res3;

    beforeEach(function(done){
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
                  done();
                });
              });
            });
          });
        });
      });
    });

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

    it('should retrieve an existing curriculum', function(done){
      // create curriculum to retrieve
      db.Curricula.create({
        name: 'testcurriculum',
        description: 'This is a test curriculum.',
        channelId: channelId,
        resources: [res1.id,res2.id,res3.id]
      })
      .then(function(curriculum){
        // test GET request to /api/curriculum/:curriculumId
        request(app)
          .get('/api/curriculum/' + curriculum.id)
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

    it('should find all resources associated with a curriculum', function(done){
      // create curriculum
      db.Curricula.create({
        name: 'testcurriculum',
        description: 'This is a test curriculum.',
        channelId: channelId,
      })
      .then(function(curriculum){
          console.log('Created testcurriculum in serverSpec. curriculum ', curriculum.id);
          
          // create records in curricula_resources table for new curricula and associated resources
          curriculum.setResources([res1, res2, res3])
            .then(function(){
              console.log('successfully set resources on curriculum in serverSpec');
              // make request to get resources associated with curricula
              request(app)
                .get('/api/curriculum/resource/' + curriculum.id)
                .expect(200)
                .expect(function(res){
                  // expect response to be an array of resources
                  expect(res.body[0].name).to.equal('testresource1');
                  expect(res.body[1].name).to.equal('testresource2');
                  expect(res.body[2].name).to.equal('testresource3');
                })
                .end(function(){
                  done();
                });
            });
      });
    });
  });

  describe('Authentication', function() {

    beforeEach(function(done){
      request(app)
        .post('/api/user/signup')
        .send({
          'name': 'testuser1',
          'password': 'testpassword1',
          'email': 'test1@test.com',
        })
        .expect(302)
        .end(done);
    });

    afterEach(function(done){
      db.Users.destroy({ where: { name: 'testuser' }})
      .then(function(affectedRows){
        console.log('Deleted testuser from DB. Rows affected: ', affectedRows);
        db.Users.destroy({ where: { name: 'testuser1' }})
        .then(function(affectedRows){
          console.log('Deleted testuser1 from DB. Rows affected: ', affectedRows);
          done();
        });
      });
    });

    it('should signup a user who does not have an account yet', function (done) {
      request(app)
        .post('/api/user/signup')
        .send({
          'name': 'testuser',
          'password': 'testpassword',
          'email': 'test@test.com',
        })
        .expect(302)
        .end(done);
    });

    it('should not signup a user who already has an account', function (done) {
      request(app)
      .post('/api/user/signup')
      .send({
        'name': 'testuser1',
        'password': 'testpassword1',
        'email': 'test@test.com',
      })
      .expect(302)
      .end(done);
    });

    it('should login a user who has an account and supplied the correct password', function (done) {
      request(app)
        .post('/api/user/login')
        .send({
          'name': 'testuser1',
          'password': 'testpassword1'
        })
        .expect(302)
        .end(done);
    });

    it('should not login a user who has an account, but supplied the wrong password', function (done) {
      request(app)
        .post('/api/user/login')
        .send({
          'name': 'testuser1',
          'password': 'wrongpassword'
        })
        .expect(302)
        .end(done);
    });

    it('should not login a user who does not have an account', function (done) {
      request(app)
        .post('/api/user/login')
        .send({
          'name': 'wronguser',
          'password': 'testpassword1'
        })
        .expect(302)
        .end(done);
    });

  });

});
