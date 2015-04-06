// app.jsx
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

//Components
var NavBar = require('./components/NavBar.jsx');


injectTapEventPlugin();

var Main = React.createClass({
  render: function(){
    return (
      <div className="full">
        <NavBar />
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));


