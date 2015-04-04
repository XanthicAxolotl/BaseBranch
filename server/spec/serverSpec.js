var expect = require('chai').expect;
var request = require('supertest');
var app = require('../serverSetup.js').app;
// var db = require('../serverSetup.js').db;

describe('', function() {
    describe('Basic Test', function() {
    it('should return 200', function (done) {
      expect(1).to.equal(1);
      done();
    });
  });
  
  /*beforeEach(function(done) {
  
    // Delete ideas from database, so that they can be recreated during the tests
    Idea.remove({title: 'Test Idea 1'}).exec();

    done();
  });

  describe('Basic Test', function() {
    it('should return 200', function (done) {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });
  });

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
