// app.jsx

var React = require('react');

var Main = React.createClass({
  render: function(){
    return (
      <div className="full">
        <div>ASDF</div>
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
