/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var D3Graph = require('./D3Graph.jsx');

// require('./Chart.less');

// get the width and height from the graph store next
var ReactGraph = React.createClass({
  getDefaultProps: function() {
    return {
      width: '700px',
      height: '560px'
    };
  },

  dispatcher: null,

  componentDidMount: function() {
    var el = this.getDOMNode();
    var dispatcher = D3Graph.create(el, {
      width: this.props.width,
      height: this.props.height
    }, this.getReactGraphState());
    // dispatcher.on('point:mouseover', this.showTooltip);
    // dispatcher.on('point:mouseout', this.hideTooltip);
    this.dispatcher = dispatcher;
    // on click, trigger "setNodeId" from NodeResourceActions.jsx
  },

  componentDidUpdate: function(prevProps, prevState) {
    var el = this.getDOMNode();
    D3Graph.update(el, this.getReactGraphState(), this.dispatcher);
  },

  getReactGraphState: function() {
    var appState = this.props.appState;

    var tooltips = [];
    if (appState.showingAllTooltips) {
      tooltips = appState.data;
    }
    else if (appState.tooltip) {
      tooltips = [appState.tooltip];
    }

    return _.assign({}, appState, {tooltips: tooltips});
  },

  render: function() {
    console.log(this.props);
    return (
      <div className="ReactGraph"></div>
    );
  },

  showTooltip: function(d) {
    if (this.props.appState.showingAllTooltips) {
      return;
    }

    this.props.setAppState({
      tooltip: d,
      // Disable animation
      prevDomain: null
    });
  },

  hideTooltip: function() {
    if (this.props.appState.showingAllTooltips) {
      return;
    }
    
    this.props.setAppState({
      tooltip: null,
      prevDomain: null
    });
  }
});

module.exports = ReactGraph;
