// app.jsx
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

//Components
var RaisedButton = mui.RaisedButton;
var NavBar = require('./components/NavBar.jsx');
var CurriculumView = require('./components/CurriculumView.jsx');
var Paper = mui.Paper;

injectTapEventPlugin();

var Main = React.createClass({
  render: function(){
    return (
      <div>
        <div className="full">
          <NavBar />
          <CurriculumView />
        </div>
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
