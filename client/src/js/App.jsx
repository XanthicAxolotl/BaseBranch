// app.jsx
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');
var Cookies = require('cookies-js');

//Components
var RaisedButton = mui.RaisedButton;
var NavBar = require('./components/NavBar.jsx');
var SearchBarView = require('./components/SearchBarView.jsx');
var PopularView = require('./components/PopularView.jsx');
var Tabs = mui.Tabs;
var Tab = mui.Tab;

injectTapEventPlugin();


var Main = React.createClass({
  cookies: function(index){
    Cookies.set('tabindex', index);
  },
  render: function(){
    var tabIndex = parseInt(Cookies.get('tabindex'));
    return (
      <div>
        <div className="full">
          <NavBar />
        </div>
        <div className="index">
          <Tabs className="indigo" initialSelectedIndex={tabIndex || 0} onChange={this.cookies}>
            <Tab label="Popular Channels">
              <PopularView />
            </Tab>
            <Tab label="Search Languages">  
              <SearchBarView />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
