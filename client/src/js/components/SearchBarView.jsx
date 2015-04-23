var React = require('react');
var Reflux = require('reflux');
var LanguageStore = require('../stores/LanguageStore.js');
var SearchActions = require('../actions/SearchActions.js');

var SearchBarView = React.createClass({
  mixins: [Reflux.connect(LanguageStore, 'languages')],
  getInitialState: function(){
    return { 
      searchString: '',
      languages: [] 
    };
  },
  handleChange: function(e){
    this.setState({ searchString: e.target.value})
  },
  componentDidMount: function(){
    SearchActions.getLanguages();
  },
  render: function(){
    var languages = this.state.languages,
    searchString = this.state.searchString.trim().toLowerCase();
    if( searchString.length > 0 ){
      //Searching and filtering results
      languages = languages.filter(function(language){
        return language.name.toLowerCase().match( searchString );
      }); 
    }
    return (
      <div className="searchBarContainer">
        <input type="text" className="searchBar" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
        <ul className="searchList">
          {languages.map(function(language){
            var url = "./curriculum.html#" + language.name;
            var gurl = "./graph.html#" + language.name;
            return <li className="searchItem">{language.name} <a href={gurl} className="graphLink">Topic View</a> <a href={url} className="curriculumLink">Curriculum View</a></li>
          })}
        </ul>
      </div>
    )
  }
});

module.exports = SearchBarView;