/*==================== REQUIRE MODULES ====================*/
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

/*============== DECLARE MATERIAL COMPONENTS ==============*/
var RaisedButton = mui.RaisedButton;
var NavBar = require('./components/NavBar.jsx');
var CurriculumView = require('./components/CurriculumView.jsx');
var Paper = mui.Paper;

injectTapEventPlugin();

console.log(window.location.href);
console.log(window.innerWidth);
console.log(window.innerHeight);

/*============ CREATE MAIN CONTAINER COMPONENT ============*/
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

/*============== RENDER MAIN CONTAINER IN DOM ==============*/
React.render(<Main />, document.getElementById('app'));
