var mui = require('material-ui');
var React = require('react');
var ChannelStore = require('../stores/ChannelStore.js');
var CurriculumBarActions = require('../actions/CurriculumBarActions.js');

//NavBar Components
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var FlatButton = mui.FlatButton;
var DropDownIcon = mui.DropDownIcon;
//Set Material-UI Vars
var LeftNav = mui.LeftNav;
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var TextField = mui.TextField;
var Paper = mui.Paper;
var injectTapEventPlugin = require("react-tap-event-plugin");
var Reflux = require('reflux');

injectTapEventPlugin();

var language = window.location.href.split('#')[1];

var CurriculumBar = React.createClass({
  mixins: [Reflux.connect(ChannelStore, 'channels')],
  getInitialState: function(){
    return { 
      channels: [],
      graphLink: "./graph.html#" + language
    };
  },
  componentDidMount: function(){
    CurriculumBarActions.getRelatedChannels(language);

  },
  menuItemChange: function(e, selectedIndex, menuItem){
    this.setState({graphLink: "./graph.html#" + menuItem.text});
    window.location.replace("/curriculum.html#" + menuItem.text);
    CurriculumBarActions.getNewChannel();
  },
  render: function() {
    var channels = this.state.channels;
    var menuItems = function(){
      var array = [{payload: '1', text:language}];
      channels.map(function(channel, i){
        array.push({payload: i + 2 + '', text: channel.name})
      });
      return array;
    }();
    console.log(menuItems);
    return (
      <Toolbar className="indigo">
        <ToolbarGroup key={0} float="left" className="nav-bar-title">
          <FlatButton linkButton={true} href={this.state.graphLink} className="topic-button">
            <span className="mui-flat-button-label">Topic View</span>
          </FlatButton>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="left" className="nav-bar-dropdown">
          <DropDownMenu menuItems={menuItems} onChange={this.menuItemChange} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

module.exports = CurriculumBar;
