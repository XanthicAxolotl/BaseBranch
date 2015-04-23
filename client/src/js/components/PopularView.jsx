var React = require('react');
var Paper = require('material-ui').Paper;

var PopularView = React.createClass({

  render: function(){
    return (
      <div className="popular-container">
        <div className="PopularLanguages">
          <h3>Popular Topics</h3>
          <div className="inner-container">
            <a href='#'>
              <Paper className="box" zDepth={1} rounded={true}>
                <img className="popular-image" src="./images/javascript-icon.png" /><h5>JavaScript</h5>
              </Paper>
            </a>
            <a href='#'>
              <Paper className="box" zDepth={1} rounded={true}>
                <img className="popular-image" src="./images/react-icon.png" /><h5>React</h5>
              </Paper>
            </a>
            <a href='#'>
              <Paper className="box" zDepth={1} rounded={true}>
                <img className="popular-image" src="./images/angular.png" /><h5>Angular</h5>
              </Paper>
            </a>
            <a href='#'>
              <Paper className="box" zDepth={1} rounded={true}>
                <img className="popular-image" src="./images/backbone.png" /><h5>Backbone</h5>
              </Paper>
            </a>
          </div>
        </div>
        <div className="PopularCurricula">
          <h3>Popular Curricula</h3>
          <div className="inner-container">  
            <a href='#'>
              <Paper className="box" zDepth={1} rounded={true}>
                <img className="popular-image" src="./images/ruby.png" /><h5>Rubyist Guilde</h5>
              </Paper>
            </a>
            <a href='#'>
              <Paper className="box" zDepth={1} rounded={true}>
                <img className="popular-image" src="./images/javascript-icon.png" /><h5>JavaScript Ninja</h5>
              </Paper>
            </a>
            <a href='#'>
              <Paper className="box" zDepth={1} rounded={true}>
                <img className="popular-image" src="./images/php.png" /><h5>Punctual PHP</h5>
              </Paper>
            </a>
            <a href='#'>
              <Paper className="box" zDepth={1} rounded={true}>
                <img className="popular-image" src="./images/python.png" /><h5>Python Marathon</h5>
              </Paper>
            </a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = PopularView;