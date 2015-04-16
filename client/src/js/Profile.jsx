/*==================== REQUIRE MODULES ====================*/
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

/*============== DECLARE MATERIAL COMPONENTS ==============*/
var NavBar = require('./components/NavBar.jsx');
var ProfileView = require('./components/ProfileView.jsx');

injectTapEventPlugin();

/*============ CREATE MAIN CONTAINER COMPONENT ============*/
var Profile = React.createClass({
  render: function(){
    return (
      <div>
        <div className="full">
          <NavBar />
        </div>
        <ProfileView />
      </div>
    )
  }
});

/*============== RENDER MAIN CONTAINER IN DOM ==============*/
React.render(<Profile />, document.getElementById('app'));