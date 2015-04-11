// app.jsx
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

//Components
var RaisedButton = mui.RaisedButton;
var NavBar = require('./components/NavBar.jsx');
var GraphBar = require('./components/GraphBar.jsx');
var GraphSideBar = require('./components/GraphSideBar.jsx');
var GraphView = require('./components/GraphView.jsx');
var GraphStore = require('./stores/GraphStore.jsx');


injectTapEventPlugin();

var Main = React.createClass({
  render: function(){
    return (
      <div>
        <div className="full">
          <NavBar />
          <span><h2>Channel: {GraphStore.channelName}</h2></span>
          <GraphBar />
          <GraphSideBar />
          <GraphView />
        </div>
      </div>
    );
  }
});


React.render(<Main />, document.getElementById('app'));
