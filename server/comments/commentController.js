var Comments = require('../config/db_models.js').Comments;

module.exports = {

  createComment: function(req, res, next) {
    // TODO: Implement

    Comments.create({
      text: req.body.text,
      resouceId: req.body.resouceId,
      userId: req.body.userId
    })
    .then(function(comments) {
      console.log('Successfully created comments in database');
      res.json(comments);
    })
    .error(function(err){
      console.error('Error in creating instance of comments: ', err);
    });
  }

};
