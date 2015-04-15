var Toolbar = require('material-ui').Toolbar;
var React = require('react');
var Reflux = require('reflux');
var LanguageStore = require('../stores/LanguageStore.js')

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
  render: function(){
    console.log(languages);
    var languages = this.state.languages,
    searchString = this.state.searchString.trim().toLowerCase();
    if( searchString.length > 0 ){
      //Searching and filtering results
      languages = languages.filter(function(language){
        return language.name.toLowerCase().match( searchString );
      }); 
    }
    console.log(languages);
    return (
      <div>
        <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
        <ul>
          {languages.map(function(language){
            return <li>{language.name} </li>
          })}
        </ul>
      </div>
    )
  }
});

module.exports = SearchBarView;