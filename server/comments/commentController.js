var Comments = require('../config/db_models.js').Comments;

module.exports = {

  createComment: function(req, res, next) {
    Comments.create({
      text: req.body.text,
      resourceId: req.body.resourceId,
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
