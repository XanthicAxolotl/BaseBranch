/*==================== REQUIRE MODULES ====================*/
var mui               = require('material-ui'),
    React             = require('react'),
    Reflux            = require('reflux'),
    CurriculumActions = require('../actions/CurriculumActions.js'),
    CurriculumStore   = require('../stores/CurriculumStore.js');

//import JS stylesheet
var Styles = require('../styles/CurriculumStyles.js');

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

/*================ CREATE CURRICULUM COMPONENTS ================*/
//Create Individual Curriculum View
var ItemView = React.createClass({
  voteUp: function(){
    this.props.editRating(this.props.curriculum.id, 'up');
  },
  voteDown: function(){
    this.props.editRating(this.props.curriculum.id, 'down');
  },
  render: function() {
    var resourceItems = this.props.curriculum.resources.map(function(resource){
      return <li key={resource.id}>{resource.name}</li>
    });
    Styles.curriculum.width = '100%';
    var curriculumUrl = "./Course.html#" + this.props.curriculum.id;
    return(
      <li style={Styles.curriculum}>
        <div style={Styles.information}>
          <ul>
            <li style={Styles.title}><div>{this.props.curriculum.name}</div><a href={curriculumUrl}>View Curriculum</a></li>
            <li>{this.props.curriculum.desc}</li>
            <li>Created By: {this.props.curriculum.author}</li>
            <li>Last Updated: {this.props.curriculum.update}</li>
            <li>Rating: {this.props.curriculum.rating}<div onClick={this.voteUp}> up</div><div onClick={this.voteDown}> down</div></li>
          </ul>
        </div>
        <div style={Styles.resources}>
          <ul>
            {resourceItems}
          </ul>
        </div>
      </li>
    )
  }
});

//Create Container View
var CurriculumView = React.createClass({
  mixins: [Reflux.connect(CurriculumStore, 'curricula')],
  getInitialState: function(){
    return {
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 1024,
      curricula: []
    };
  },
  handleRating: function(itemId, dir){
    if (dir === 'up'){
      CurriculumActions.upVote(itemId);
    } else if (dir === 'down'){
      CurriculumActions.downVote(itemId);
    }
  },
  handleResize: function(e) {
    this.setState({
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 1024
    });
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
    CurriculumStore.triggerMe();
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  render: function() {
    Styles.list.width = (this.state.windowWidth * 0.9);
    var curry = this;
    var curricular = this.state.curricula.map(function(result) {
      return <ItemView key={result.id} curriculum={result} editRating={curry.handleRating}/>
    });
    return (
      <div style={Styles.container}>
        <ul style={Styles.list}>
          {curricular}
        </ul>
      </div>
    );
  }
});

/*============== EXPORT CURRICULUM COMPONENT ==============*/
module.exports = CurriculumView;
