var mui = require('material-ui');
var React = require('react');


//Set Material-UI Vars
var Menu = mui.Menu;

var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

// these should be populated by the database

var numberMenuItems = [
   { payload: '1', text: 'Build Curriculum'},
   { payload: '2', text: 'Example Node 1', data: 'jQuery'},
   { payload: '3', text: 'Example Node 2', data: 'Backbone' }
];





var GraphSideBar = React.createClass({

  render: function() {
    return (
      <div className="right">
        <Menu menuItems={numberMenuItems} />
      </div>
    );
  }
});

module.exports = GraphSideBar;
