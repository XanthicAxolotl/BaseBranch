/*==================== REQUIRE MODULES ====================*/
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

/*============== DECLARE MATERIAL COMPONENTS ==============*/
var NavBar = require('./components/NavBar.jsx');
var AboutView = require('./components/AboutView.jsx');

injectTapEventPlugin();

/*============ CREATE MAIN CONTAINER COMPONENT ============*/
var About = React.createClass({
  render: function(){
    return (
      <div>
        <div className="full">
          <NavBar />
        </div>
        <AboutView />
      </div>
    )
  }
});

/*============== RENDER MAIN CONTAINER IN DOM ==============*/
React.render(<About />, document.getElementById('app'));