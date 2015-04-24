var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');


var AboutView = React.createClass({
  render: function(){
    return (
      <div className="full">
      <div className="sect-3">
      <h1 className="about-title">The Team</h1>
      <div className="col-md-2">
          <h4>Wendy <br />Leung</h4>
          <img className="picture" src={'https://s-media-cache-ak0.pinimg.com/originals/fb/cd/97/fbcd9760780dceec903649fd75ef7016.jpg'} />
        <hr />
        <div className="row">
          <a className="col-md-two" href="http://www.github.com/wendyleung"><span className="fa fa-github-alt"></span></a>
          <a className="col-md-two" href="http://www.linkedin.com/in/wendysarahleung"><span className="fa fa-linkedin"></span></a>
        </div>
        <hr />
        <h5>Scrum Master</h5>
        <p>Server and Views <br />Full Stack Engineer</p>
        <hr />
        <p>"Web all the resources to one cob."</p>
        <hr />
      </div>
      <div className="col-md-2">
        <h4>Julia <br />Nething</h4>
        <img className="picture" src={'https://s-media-cache-ak0.pinimg.com/originals/fb/cd/97/fbcd9760780dceec903649fd75ef7016.jpg'} />
        <hr />
        <div className="row">
          <a className="col-md-3" href="http://www.github.com/cjnething"><span className="fa fa-github-alt"></span></a>
          <a className="col-md-3" href="http://www.linkedin.com/in/nething"><span className="fa fa-linkedin"></span></a>
          <a className="col-md-3" href="http://www.twitter.com/julianething"><span className="fa fa-twitter"></span></a>
        </div>
        <hr />
        <h5>Development Team</h5>
        <p>React Views <br />Front End Engineer</p>
        <hr />
        <p>"Does anyone want popcorn or Diet Coke?"</p>
        <hr />
      </div>
      <div className="col-md-2">
        <h4>Michael <br />Roberts</h4>
        <img className="picture" src={'https://s-media-cache-ak0.pinimg.com/originals/fb/cd/97/fbcd9760780dceec903649fd75ef7016.jpg'} />
        <hr />
        <div className="row">
          <a className="col-md-two" href="http://www.github.com/MichaelRoberts214"><span className="fa fa-github-alt"></span></a>
          <a className="col-md-two" href="http://www.linkedin.com/in/michaelroberts7"><span className="fa fa-linkedin"></span></a>
        </div>
        <hr />
        <h5>Project Manager</h5>
        <p>D3 Visualization <br />Front End Engineer</p>
        <hr />
        <p>"Is such a thing even possible? Yes it is."</p>
        <hr />
      </div>
      <div className="col-md-2">
        <h4>Kalev <br />Roomann-Kurrik</h4>
        <img className="picture" src={'https://s-media-cache-ak0.pinimg.com/originals/fb/cd/97/fbcd9760780dceec903649fd75ef7016.jpg'} />
        <hr />
        <div className="row">
          <a className="col-md-3" href="https://www.github.com/KalevRK"><span className="fa fa-github-alt"></span></a>
          <a className="col-md-3" href="http://www.linkedin.com/in/kalevrk"><span className="fa fa-linkedin"></span></a>
          <a className="col-md-3" href="http://www.twitter.com/kalevrk"><span className="fa fa-twitter"></span></a>
        </div>
        <hr />
        <h5>Development Team</h5>
        <p>Database Architect <br />Back End Engineer</p>
        <hr />
        <p>"I'm on my twelfth cup of coffee and it's only 9 AM."</p>
        <hr />
      </div>
      <div className="col-md-2">
        <h4>Robert <br />Zheng</h4>
        <img className="picture" src={'https://s-media-cache-ak0.pinimg.com/originals/fb/cd/97/fbcd9760780dceec903649fd75ef7016.jpg'} />
        <hr />
        <div className="row">
          <a className="col-md-3" href="http://www.github.com/zhengcano"><span className="fa fa-github-alt"></span></a>
          <a className="col-md-3" href="http://www.linkedin.com/in/zhengrobert"><span className="fa fa-linkedin"></span></a>
          <a className="col-md-3" href="http://zhengcano.github.io/"><span className="fa fa-quote-right"></span></a>
        </div>
        <hr />
        <h5>Product Owner</h5>
        <p>UI Designer <br />Front End Engineer</p>
        <hr />
        <p>"I'm the original Full Snack Engineer."</p>
        <hr />
      </div>
      </div>
      <div className="sect-3">
      <h1 className="about-title">The Stack</h1>
        <h4 className="col-md-4">React </h4>
        <h4 className="col-md-4">Reflux </h4>
        <h4 className="col-md-4">Node </h4>
        <h4 className="col-md-4">Express </h4>
        <h4 className="col-md-4">MySQL </h4>
        <h4 className="col-md-4">Sequelize </h4>
        <h4 className="col-md-4">Passport </h4>
        <h4 className="col-md-4">Oauth </h4>
        <h4 className="col-md-4">D3 </h4>
        <h4 className="col-md-4">Browserify </h4>
        <h4 className="col-md-4">Gulp </h4>
        <h4 className="col-md-4">Material UI </h4>
        <h4 className="col-md-4">Heroku </h4>
      </div>
      </div>
    )
  }
});

module.exports = AboutView;
