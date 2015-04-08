/*==================== REQUIRE MODULES ====================*/
var mui             = require('material-ui'),
    React           = require('react'),
    CurriculumStore = require('../stores/CurriculumStore.jsx');
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

/*======================== MOCK DATA ========================*/
// these should be populated by the database
var menuItems = [{
                  id: '1',
                  name: 'Super Xanthic Curriculum!',
                  desc:'Example Framework 1',
                  author:'Xanthic Axolotl',
                  src:'http://www.walmart.com',
                  update: new Date().getDate,
                  rating: 20,
                  resources: [{key: 1, name: 'Super Awesome Javascript Blog!'}]
                },
                {
                  id: '2',
                  name: 'Super Xanthic Curriculum!',
                  desc:'Example Framework 1',
                  author:'Xanthic Axolotl',
                  src:'http://www.walmart.com',
                  update: new Date().getDate,
                  rating: 20,
                  resources: [{key: 1, name: 'Super Awesome Javascript Blog!'},
                              {key: 2, name: 'Super Awesome Javascript Blog!'},
                              {key: 3, name: 'Super Awesome Javascript Blog!'},
                              {key: 4, name: 'Super Awesome Javascript Blog!'},
                              {key: 5, name: 'Super Awesome Javascript Blog!'}]
                }];

/*================ CREATE CURRICULUM COMPONENTS ================*/
//Create Individual Curriculum View
var ItemView = React.createClass({
  render: function() {
    var resources = this.props.resources.map(function(resource){
      return <li key={resource.key}>{resource.name}</li>
    });
    Styles.curriculum.width = '100%';
    return(
      <li style={Styles.curriculum}>
        <div style={Styles.information}>
          <ul>
            <li style={Styles.title}><div>{this.props.name}</div><a href={this.props.anchor}>View Curriculum</a></li>
            <li>{this.props.desc}</li>
            <li>Created By: {this.props.author}</li>
            <li>Last Updated: {this.props.update}</li>
            <li>Rating: {this.props.rating}</li>
          </ul>
        </div>
        <div style={Styles.resources}>
          <ul>
            {resources}
          </ul>
        </div>
      </li>
    )
  }
});

//Create Container View
var CurriculumView = React.createClass({
  getInintialState: function(){
    return {
      windowWidth: window.innerWidth
    };
  },
  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  render: function() {
    Styles.list.width = (window.innerWidth * 0.8);
    var curricula = menuItems.map(function(result) {
      return <ItemView key={result.id} name={result.name} desc={result.desc} author={result.author} anchor={result.src} update={result.update} rating={result.rating} resources={result.resources}/>
    });
    return (
      <div style={Styles.container}>
        <ul style={Styles.list}>
          {curricula}
        </ul>
      </div>
    );
  }
});

/*============== EXPORT CURRICULUM COMPONENT ==============*/
module.exports = CurriculumView;
