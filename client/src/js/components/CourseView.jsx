/*==================== REQUIRE MODULES ====================*/
var mui             = require('material-ui'),
    React           = require('react');
    // CourseStore = require('../stores/CourseStore.jsx');
//import JS stylesheet
var Styles = require('../styles/CourseStyles.js');

/*============== DECLARE MATERIAL COMPONENTS ==============*/
//NavBar Components
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var RaisedButton = mui.RaisedButton;
var DropDownIcon = mui.DropDownIcon;
//Set Material-UI Vars
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var TextField = mui.TextField;
var Paper = mui.Paper;
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

/*======================== MOCK DATA ========================*/
// these should be populated by the database
var course = {};

/*================ CREATE CURRICULUM COMPONENTS ================*/
//Create Header View
var Header = React.createClass({
  render: function() {
    return(
      <div>
        <div>
          <div>{this.props.name}</div>
          <div>{this.props.desc}</div>
        </div>
        <div>
          <ul>
            <li>Created By: {this.props.creator}</li>
            <li>Last Updated: {this.props.update}</li>
            <li>Rating: {this.props.rating}</li>
          </ul>
        </div>
      </div>
    )
  }
});

//Create CL Resource View
var CheckListResource = React.createClass({
  render: function(){
    return(
      <li><span>{this.props.name}</span><form><input type="checkbox" checked={this.props.isChecked}/></form></li>
    )
  }
});

//Create Checklist View
var CheckList = React.createClass({
  render: function(){
    var chResource = this.props.resources.map(function(result){
      return <CheckListResource name={result.name} isChecked={result.checked}/>
    });
    return(
      <div>
        <ul>
          {chResource}
        </ul>
      </div>
    )
  }
});

//Create Individual Resource View
var ResourceView = React.createClass({
  render: function() {
    if (this.props.type === 'header'){
      return(
        <li><h3>{this.props.name}</h3></li>
      )
    } else {
      return(
        <li>
          <div>{this.props.name}</div>
          <div>{this.props.rating}</div>
          <div>{this.props.description}</div>
          <div>{this.props.url}</div>
        </li>
      )
    }
  }
});

//Create Course View
var CourseView = React.createClass({
  getInitialState: function(){
    return {
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 1024
    };
  },
  handleResize: function(e) {
    this.setState({
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 1024
    });
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  render: function() {
    Styles.list.width = (this.state.windowWidth * 0.9);
    var resources = course.resources.map(function(result) {
      return <ResourceView name={result.name} rating={result.rating} description={result.description} url={result.url} type={result.type}/>
    });
    return (
      <div>
        <Header name={course.name} desc={course.description} creator={course.creator} updated={course.updated} rating={course.rating}/>
        <CheckList resources={course.resources}/>
        <div>
          <h4>Resources</h4>
          <ul>
            {resources}
          </ul>
        </div>
      </div>
    );
  }
});

/*============== EXPORT CURRICULUM COMPONENT ==============*/
module.exports = CourseView;