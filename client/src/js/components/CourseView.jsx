/*==================== REQUIRE MODULES ====================*/
var mui             = require('material-ui'),
    React           = require('react'),
    Reflux           = require('reflux'),
    CourseStore     = require('../stores/CourseStore.js'),
    CourseActions   = require('../actions/CourseActions.js');
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

/*================ CREATE CURRICULUM COMPONENTS ================*/
//Create Header View
var Header = React.createClass({
  render: function() {
    return(
      <div style={Styles.header}>
        <div style={Styles.headerLeft}>
          <div><h3 style={Styles.reset}>{this.props.name}</h3></div>
          <div>{this.props.desc}</div>
        </div>
        <div style={Styles.headerRight}>
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
  toggleCheck: function(){
    this.props.toggleCheck(this.props.id);
  },
  render: function(){
    if (this.props.type === 'header'){
      return(
        <li style={Styles.title}><h5 style={Styles.section}>{this.props.name}</h5></li>
      )
    } else {
      return(
        <li style={Styles.item}><span>{this.props.name}</span><input type="checkbox" checked={this.props.isChecked} onChange={this.toggleCheck}/></li>
      )
    }
  }
});

//Create Checklist View
var CheckList = React.createClass({
  render: function(){
    var check = this;
    var chResource = this.props.resources.map(function(result){
      return <CheckListResource name={result.name} isChecked={result.isChecked} type={result.type} toggleCheck={check.toggleCheck}/>
    });
    return(
      <div style={{paddingLeft: '10px'}}>
        <h4 style={Styles.reset}>CheckList</h4>
        <ul>
          {chResource}
        </ul>
      </div>
    )
  }
});

//Create Individual Resource View
var ResourceView = React.createClass({
  voteUp: function(){
    this.props.handleVote(this.props.id, 'up');
  },
  voteDown: function(){
    this.props.handleVote(this.props.id, 'down');
  },
  render: function() {
    if (this.props.type === 'header'){
      return(
        <li style={Styles.singleResourceH}><h5 style={Styles.section}>{this.props.name}</h5></li>
      )
    } else {
      return(
        <li style={Styles.singleResourceI}>
          <div><span style={Styles.bold}>{this.props.name}</span><span> - Rating: {this.props.rating}</span><span onClick={this.voteUp}> up</span><span onClick={this.voteDown}> down</span></div>
          <div>{this.props.description}</div>
          <div>{this.props.url}</div>
        </li>
      )
    }
  }
});

//Create Course View
var CourseView = React.createClass({
  mixins: [Reflux.connect(CourseStore, 'course')],
  getInitialState: function(){
    return {
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 1024,
      course:{resources:[]}
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
    CourseStore.triggerMe();
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  handleCheck: function(resourceId){
    CourseActions.toggleCheck(resourceId);
  },
  handleVote: function(id, dir){
    if (dir === 'up'){
      CourseActions.upVote(id);
    } else if (dir === 'down'){
      CourseActions.downVote(id);
    }
  },
  render: function() {
    var context = this;
    var resources = this.state.course.resources.map(function(result) {
      return <ResourceView id={result.id} name={result.name} rating={result.rating} description={result.description} url={result.url} type={result.type} handleVote={context.handleVote}/>
    });
    return (
      <div>
        <Header name={this.state.course.name} desc={this.state.course.description} creator={this.state.course.creator} updated={this.state.course.updated} rating={this.state.course.rating}/>
        <div style={Styles.resourceContainer}>
          <div style={Styles.checkList}>
            <CheckList resources={this.state.course.resources} toggleCheck={this.handleCheck} />
          </div>
          <div style={Styles.resources}>
            <h3 style={Styles.reset}>Resources</h3>
            <ul>
              {resources}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

/*============== EXPORT CURRICULUM COMPONENT ==============*/
module.exports = CourseView;
