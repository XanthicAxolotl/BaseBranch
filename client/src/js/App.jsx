// app.jsx

var React = require('react');

var Main = React.createClass({
  render: function() {
    return (
      <div>
        Turn down for what?
        <button>
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
