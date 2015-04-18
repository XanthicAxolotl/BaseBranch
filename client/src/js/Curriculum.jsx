/*==================== REQUIRE MODULES ====================*/
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

/*=================== REQUIRE COMPONENTS ===================*/
var NavBar = require('./components/NavBar.jsx');
var CurriculumView = require('./components/CurriculumView.jsx');
var CurriculumBar = require('./components/CurriculumBar.jsx')
/*============== DECLARE MATERIAL COMPONENTS ===============*/
var Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;

injectTapEventPlugin();

/*============ CREATE MAIN CONTAINER COMPONENT ============*/
var Main = React.createClass({
  render: function(){
    return (
      <div>
        <div className="full">
          <NavBar />
          <CurriculumBar />
          <CurriculumView />
        </div>
      </div>
    );
  }
});

/*============== RENDER MAIN CONTAINER IN DOM ==============*/
React.render(<Main />, document.getElementById('app'));
