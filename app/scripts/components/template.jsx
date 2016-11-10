var React = require('react');


var TemplateComponent = React.createClass({
  render: function(){
    var username = localStorage.getItem('username');
    return(
      <div className='contain'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
            <li><a className="navbar-brand" href="#">Classy Hound</a></li>
             <li className="tshirts"><a href="#">Tshirts</a></li>
             <li><a href="#cart/">Cart</a></li>
             <li className='username'><a>Logged In As: {username}</a></li>
            </ul>
          </div>
          </nav>


        {this.props.children}


      </div>
    )
  }
});

module.exports = TemplateComponent;
