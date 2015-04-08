var mui = require('material-ui');
var React = require('react');

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

var curriculumContainerStyle = {
                                 display: '-webkit-box',
                                 display: '-webkit-flex',
                                 display: '-ms-flexbox',
                                 display: 'flex',
                                 WebkitBoxOrient: 'vertical',
                                 WebkitBoxDirection: 'reverse',
                                 WebkitFlexDirection: 'column',
                                 msFlexDirection: 'column',
                                 flexDirection: 'column',
                               };
var singleCurriculumStyle = {
                              display: '-webkit-box',
                              display: '-webkit-flex',
                              display: '-ms-flexbox',
                              display: 'flex',
                              WebkitBoxOrient: 'horizontal',
                              WebkitBoxDirection: 'normal',
                              WebkitFlexDirection: 'row',
                              msFlexDirection: 'row',
                              flexDirection: 'row'
                            }
var resourceTitleStyle = {
                            display: '-webkit-box',
                            display: '-webkit-flex',
                            display: '-ms-flexbox',
                            display: 'flex',
                            WebkitBoxOrient: 'horizontal',
                            WebkitBoxDirection: 'normal',
                            WebkitFlexDirection: 'row',
                            msFlexDirection: 'row',
                            flexDirection: 'row',
                            WebkitBoxPack: 'justify',
                            WebkitJustifyContent: 'space-between',
                            msFlexPack: 'justify',
                            justifyContent: 'space-between'
                          }

// these should be populated by the database
var menuItems = [{
                  id: '1',
                  name: 'Super Xanthic Curriculum!',
                  desc:'Example Framework 1',
                  author:'Xanthic Axolotl',
                  anchor:'http://www.walmart.com',
                  update: new Date().getDate,
                  rating: 20,
                  resources: [{key: 1, name: 'Super Awesome Javascript Blog!'}]
                },
                {
                  id: '2',
                  name: 'Super Xanthic Curriculum!',
                  desc:'Example Framework 1',
                  author:'Xanthic Axolotl',
                  anchor:'http://www.walmart.com',
                  update: new Date().getDate,
                  rating: 20,
                  resources: [{key: 1, name: 'Super Awesome Javascript Blog!'},
                              {key: 2, name: 'Super Awesome Javascript Blog!'},
                              {key: 3, name: 'Super Awesome Javascript Blog!'},
                              {key: 4, name: 'Super Awesome Javascript Blog!'},
                              {key: 5, name: 'Super Awesome Javascript Blog!'}]
                }];

var ItemView = React.createClass({
  render: function() {
    var resources = this.props.resources.map(function(resource){
      return <li>{resource.name}</li>
    });
    return(
      <li class="single-curriculum" style={singleCurriculumStyle}>
        <div>
          <ul class="curriculum-info">
            <li class="resource-title" style={resourceTitleStyle}><div>{this.props.name}</div><a href={this.props.anchor}>View Curriculum</a></li>
            <li>{this.props.desc}</li>
            <li>Created By: {this.props.author}</li>
            <li>Last Updated: {this.props.update}</li>
            <li>Rating: {this.props.rating}</li>
          </ul>
        </div>
        <div>
          <ul class="resource-list">
            {resources}
          </ul>
        </div>
      </li>
    )
  }
});

var CurriculumView = React.createClass({
  render: function() {
    var curry = menuItems.map(function(result) {
      return <ItemView key={result.id} name={result.name} desc={result.desc} author={result.author} anchor={result.src} update={result.update} rating={result.rating} resources={result.resources}/>
    });

    return (
      <div>
        <ul class="curriculum-container" style={curriculumContainerStyle}>
          {curry}
        </ul>
      </div>
    );
  }
});

module.exports = CurriculumView;