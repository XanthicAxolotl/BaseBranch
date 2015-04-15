var React = require('react');
var Paper = require('material-ui').Paper;

var PopularView = React.createClass({

  render: function(){
    return (
      <div>
      <div className="PopularLanguages">
        <p>Popular Languages</p>
      <Paper className="box" zDepth={1} rounded={false}>
        <p>Javascript</p>
      </Paper>
      <Paper className="box" zDepth={1} rounded={false}>
        <p>Ruby</p>
      </Paper>
      <Paper className="box" zDepth={1} rounded={false}>
        <p>Python</p>
      </Paper>
      <Paper className="box" zDepth={1} rounded={false}>
        <p>PHP</p>
      </Paper>
      </div>
      <div className="PopularCurricula">
        <p>Popular Curricula</p>
      <Paper className="box" zDepth={1} rounded={false}>
        <p>Rubyist Guilde</p>
      </Paper>
      <Paper className="box" zDepth={1} rounded={false}>
        <p>Javascript Ninja</p>
      </Paper>
      <Paper className="box" zDepth={1} rounded={false}>
        <p>Pftt PHP</p>
      </Paper>
      <Paper className="box" zDepth={1} rounded={false}>
        <p>Python Marathon</p>
      </Paper>
      </div>
      </div>
    )
  }
});

module.exports = PopularView;