var React = require('react');

var TemplateComponent = require('./template.jsx');

var CartComponent = React.createClass({
  render: function(){
    return(
      <div>
        
      </div>
    )
  }
});

var CartContainer = React.createClass({
  render: function(){
    return(
      <TemplateComponent>
        <CartComponent />
      </TemplateComponent>
    )
  }
});

module.exports = {
  CartContainer: CartContainer
}
