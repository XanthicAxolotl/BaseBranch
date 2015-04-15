var mui = require('material-ui');
var React = require('react');
var GraphStore = require('../stores/GraphStore.jsx');
var ResourceStore = require('../stores/ResourceStore.jsx');
var Reflux = require('reflux');
var Modal = require('react-modal');
var d3 = require('d3');
var AddRemoveDatum = require('./AddRemoveDatum.jsx');
var dataGenerator = require('./dataGenerator.jsx');
var ReactGraph = require('./ReactGraph.jsx');
var NodeView = require('./NodeView.jsx');
var _ = require('lodash');


var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();
React.initializeTouchEvents(true);


var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();


var GraphView = React.createClass({
  
  mixins: [Reflux.listenTo(GraphStore, 'updateData'), Reflux.listenTo(ResourceStore, 'openModal')],

  getInitialState: function() {
    var domain = [0, 30];
    return {
      data: this.getData(domain),
      domain: {x: domain, y: [0, 100]},
      tooltip: null,
      prevDomain: null,
      showingAllTooltips: false,
      modalIsOpen: false
    };
  },

  updateData: function(data) {
    // update this.state's data
    var domain = [0, 30];
    this.setState({
      data: data,
      domain: {x: domain, y: [0, 100]},
      tooltip: null,
      prevDomain: null,
      showingAllTooltips: false,
      // x: 20,
      // y: 50,
      // z: 10
    });
  },

  _allData: dataGenerator.generate(GraphStore.nodeData.length),

  getData: function(domain) {
    return _.filter(this._allData, this.isInDomain.bind(null, domain));
  },

  addDatum: function(domain) {
    this._allData.push(dataGenerator.generateDatum(domain));
    return this.getData(domain);
  },

  removeDatum: function(domain) {
    var match = _.find(this._allData, this.isInDomain.bind(null, domain));
    if (match) {
      this._allData = _.reject(this._allData, {id: match.id});
    }
    return this.getData(domain);
  },

  isInDomain: function(domain, d) {
    return d.x >= domain[0] && d.x <= domain[1];
  },

  openModal: function(){
    this.setState({modalIsOpen: true});
  },

  closeModal: function(){
    this.setState({modalIsOpen: false});
  },
    
  render: function() {
    return (
      <div className="left">
        <ReactGraph
          appState={this.state}
          setAppState={this.setAppState} />
        <AddRemoveDatum
          appState={this.state}
          setAppState={this.setAppState}
          addDatum={this.addDatum}
          removeDatum={this.removeDatum} />
        <Modal isOpen={this.state.modalIsOpen}>
          <button onClick={this.closeModal} className="waves-effect waves-light btn">Close</button>
          <NodeView />
        </Modal>
      </div>
    )
  },

  setAppState: function(partialState, callback) {
    return this.setState(partialState, callback);
  }
});

module.exports = GraphView;
