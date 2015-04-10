/*==================== REQUIRE MODULES ====================*/
var mui             = require('material-ui'),
    React           = require('react');
    // CourseStore = require('../stores/CourseStore.js');
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
var course = {
  name: 'Super Xanthic JavaScript Course',
  description: 'Awesome JS Course made by Yellow Amphibians',
  creator: 'Team Xanthic Axolotl',
  updated: new Date().getDate(),
  rating: 9001,
  resources: [
    {
      name: 'How To Even',
      rating: -20,
      description: 'For those who cannot even',
      url: 'http://www.google.com',
      type: 'blog',
      isChecked: true
    },
    {
      name: 'Hey, enough of the jokes, on to the real stuff!',
      type: 'header',
      isChecked: false
    },
    {
      name: 'Codecademy JavaScript Course',
      rating: 10,
      description: 'Codecademy interactive JavaScript intro course',
      url: 'http://www.codecademy.com',
      type: 'interactive tutorial',
      isChecked: false
    },
    {
      name: "Kalev Roomann-Kurrik's Awesome Blog for People who want to Learn JavaScript",
      rating: 99,
      description: 'Super Awesome Blog that will turn you into a seafood-eating taichi master along the way!',
      url: 'http://www.jasonchangloveskalev.com',
      type: 'blog',
      isChecked: false
    },
    {
      name: "Recreating WendyCoin with JavaScript Objects",
      rating: '4 (capped at the max # of wendycoins owned by a single person)',
      description: "Learn how to clone the world's most exclusive woo-woo currency in JS",
      url: 'http://www.coolcutecoughingcats.com/billysboots',
      type: 'video',
      isChecked: false
    },
    {
      name: 'Sneaky, sneaky Recursions!',
      type: 'header',
      isChecked: false
    },
    {
      name: "Wizarding Recursion JavaScript Magic",
      rating: '9 3/4',
      description: "Make your computer work recursions while you take lunch naps in the park",
      url: 'http://www.isvoldemortaterrorist.com/marvelousriddles',
      type: 'horcrux',
      isChecked: false
    }
  ]

};

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
  render: function(){
    if (this.props.type === 'header'){
      return(
        <li style={Styles.title}><h5 style={Styles.section}>{this.props.name}</h5></li>
      )
    } else {
      return(
        <li style={Styles.item}><span>{this.props.name}</span><input type="checkbox" checked={this.props.isChecked} /></li>
      )
    }
  }
});

//Create Checklist View
var CheckList = React.createClass({
  render: function(){
    var chResource = this.props.resources.map(function(result){
      return <CheckListResource name={result.name} isChecked={result.isChecked} type={result.type}/>
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
  render: function() {
    if (this.props.type === 'header'){
      return(
        <li style={Styles.singleResourceH}><h5 style={Styles.section}>{this.props.name}</h5></li>
      )
    } else {
      return(
        <li style={Styles.singleResourceI}>
          <div><span style={Styles.bold}>{this.props.name}</span> - Rating: {this.props.rating}</div>
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
    var resources = course.resources.map(function(result) {
      return <ResourceView name={result.name} rating={result.rating} description={result.description} url={result.url} type={result.type}/>
    });
    return (
      <div>
        <Header name={course.name} desc={course.description} creator={course.creator} updated={course.updated} rating={course.rating}/>
        <div style={Styles.resourceContainer}>
          <div style={Styles.checkList}>
            <CheckList resources={course.resources} />
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