var Curricula = require('../config/db_models.js').Curricula;

module.exports = {

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

      // associate curriculum with associated resources
      // will receive an array of resourceIds in the req body
      curriculum.setResources(body.resources).then(function(){
        console.log('Successfully associated resources with curriculum in database');
      })
      .error(function(err){
        console.error('Error in associating resources with curriculum: ', err);
      });

      // send back the newly created curriculum as a JSON object
      res.json(curriculum);
    })
    .error(function(err){
      console.error('Error in creating instance of curriculum: ', err);
    });
  },

  getCurriculum: function(req, res, next) {
    // retrieve the curriculum that has the id passed in as a request parameter
    Curricula.find({ where:{ id: req.params.curriculumId } })
    .then(function(curriculum){
      console.log('Successfully found curriculum ', curriculum.id);
      res.json(curriculum);
    })
    .error(function(err){
      console.error('Error in finding curriculum', err);
    });
  },

  upRating: function(req, res, next) {
    Curricula.find({where: { id: req.params.curriculumId }})
    .then(function(curriculum){
      curriculum.increment('rating')
        .then(function(newcurriculum){
          newcurriculum.reload()
          .then(function(newcurriculum) {
            console.log('Successfully increase rating for curriculum', curriculum.id);
            res.json(newcurriculum.rating);
          });
        });
    })
    .error(function(err){
      console.error('Error in finding curriculum to increase rating',err);
    });
  },

  downRating: function(req, res, next) {
    Curricula.find({where: { id: req.params.curriculumId }})
    .then(function(curriculum){
      curriculum.decrement('rating')
        .then(function(newcurriculum){
          newcurriculum.reload()
          .then(function(newcurriculum) {
            console.log('Successfully decrease rating for curriculum', curriculum.id);
            res.json(newcurriculum.rating);
          });
        });
    })
    .error(function(err){
      console.error('Error in finding curriculum to decrease rating',err);
    });
  },

  getAllResources: function(req, res, next) {
    // look up all resourceIds in the curricula_resources table that have the corresponding curriculaId
    Curricula.find({ where:{ id: req.params.curriculumId } })
    .then(function(curriculum){
      console.log('Found curriculum: ', curriculum.name);
      curriculum.getResources()
      .then(function(resources){
        console.log('Successfully found all resources associated with curriculum');
        res.json(resources);
      })
      .error(function(err){
        console.error('Error in finding all resources associated with curriculum:', err);
      });
    })
    .error(function(err){
      console.error('Error in finding curriculum', err);
    });
    // retrieve all of the corresponding resources from the resources table and send back
  }
};
