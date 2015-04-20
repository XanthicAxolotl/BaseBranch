// Curriculum Controller
// ---------------------
//
// The methods in the Curriculum Controller are invoked when requests are sent to specific paths with specific HTTP request methods. The methods use Sequelize to interact with Curriculum instances in the database.

var Curricula = require('../config/db_models.js').Curricula;
var Channels = require('../config/db_models.js').Channels;

module.exports = {

  // Create a new Curriculum instance in the database based on the data sent in on the request.
  createCurriculum: function(req, res, next) {
    var body = req.body;

    Curricula.create({
      name: body.name,
      description: body.description,
      userId: body.userId,
      channelId: body.channelId
    })
    .then(function(curriculum) {
      console.log('Successfully created curriculum in database');

      // Associate the newly created Curriculum instance with the passed in Resources. The request body contains an array of resourceIds to associate with the Curriculum instance.
      curriculum.setResources(body.resources).then(function(){
        console.log('Successfully associated resources with curriculum in database');
      })
      .error(function(err){
        console.error('Error in associating resources with curriculum: ', err);
      });

      // Send back to the client the Curriculum instance as a JSON object.
      res.json(curriculum);
    })
    .error(function(err){
      console.error('Error in creating instance of curriculum: ', err);
    });
  },

  // Retrieve a specific Curriculum instance.
  getCurriculum: function(req, res, next) {
    Curricula.find({ where:{ id: req.params.curriculumId } })
    .then(function(curriculum){
      console.log('Successfully found curriculum ', curriculum.id);
      // Find the channel with the associated channel Id
      Channels.find({ where:{ id: curriculum.channelId} })
      .then(function(chan){
        curriculum.dataValues.channelName = chan.dataValues.name;
        // Send back to the client the Curriculum instance as a JSON object.
        res.json(curriculum);
      })
      .error(function(err){
        console.error('Error in finding curriculum\'s channel', err);
      });
    })
    .error(function(err){
      console.error('Error in finding curriculum', err);
    });
  },

  // Increment the rating of a Curriculum instance.
  upRating: function(req, res, next) {
    Curricula.find({where: { id: req.params.curriculumId }})
    .then(function(curriculum){
      curriculum.increment('rating')
        .then(function(newcurriculum){
          newcurriculum.reload()
          .then(function(newcurriculum) {
            console.log('Successfully increase rating for curriculum', curriculum.id);
            // Send back to the client the updated rating value.
            res.json(newcurriculum.rating);
          });
        });
    })
    .error(function(err){
      console.error('Error in finding curriculum to increase rating',err);
    });
  },

  // Decrement the rating of a Curriculum instance.
  downRating: function(req, res, next) {
    Curricula.find({where: { id: req.params.curriculumId }})
    .then(function(curriculum){
      curriculum.decrement('rating')
        .then(function(newcurriculum){
          newcurriculum.reload()
          .then(function(newcurriculum) {
            console.log('Successfully decrease rating for curriculum', curriculum.id);
            // Send back to the client the updated rating value.
            res.json(newcurriculum.rating);
          });
        });
    })
    .error(function(err){
      console.error('Error in finding curriculum to decrease rating',err);
    });
  },

  // Retrieve all of the Resources for a specific Curriculum from the database and send back to the client.
  getAllResources: function(req, res, next) {
    Curricula.find({ where:{ id: req.params.curriculumId } })
    .then(function(curriculum){
      console.log('Found curriculum: ', curriculum.name);
      curriculum.getResources()
      .then(function(resources){
        console.log('Successfully found all resources associated with curriculum');
        // Send back to the client the Resource instances as a JSON object.
        res.json(resources);
      })
      .error(function(err){
        console.error('Error in finding all resources associated with curriculum:', err);
      });
    })
    .error(function(err){
      console.error('Error in finding curriculum', err);
    });
  }
};
