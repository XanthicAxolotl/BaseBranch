// app.jsx
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

//Components
var RaisedButton = mui.RaisedButton;
var NavBar = require('./components/NavBar.jsx');
var SearchBarView = require('./components/SearchBarView.jsx');
var PopularView = require('./components/PopularView.jsx');

injectTapEventPlugin();

var Main = React.createClass({
  render: function(){
    return (
      <div>
      <div className="full">
        <NavBar />
      </div>
      <div className="index">
        <PopularView />
        <SearchBarView />
      </div>
        <SearchBarView />
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
