// app.jsx
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

//Components
var NavBar = require('./components/NavBar.jsx');
var GraphView = require('./components/GraphView.jsx');
var NodeView = require('./components/NodeView.jsx');
var Paper = mui.Paper;


injectTapEventPlugin();

var Main = React.createClass({
  render: function(){
    return (
      <div className="full">
        <NodeView />
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));


