var React = require('react');

var TemplateComponent = require('./template.jsx');

var CartComponent = React.createClass({
  render: function(){
    var cartData = this.props.cartItems.map(function(item){
      return(
        <tr key={item.title}>
          <th>{item.title}</th>
          <td>Still in work</td>
          <td>Still in work</td>
          <td>Still in work</td>
          <td><button onClick={self.handleRemove} type="button" className="btn btn-warning">Remove</button></td>
        </tr>
      )
    });
    return(
      <div className="container">
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Shirt</th>
                <th>Size</th>
                <th>QTY</th>
                <th>Deal Expires</th>
                <th>Remove From Cart</th>
              </tr>
            </thead>
            <tbody>
              {cartData}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
});

var CartContainer = React.createClass({
  getInitialState: function(){
    var cartItems = JSON.parse(localStorage.getItem('order'));
    console.log('cart', cartItems);
    return{
      cartItems: cartItems
    }
  },
  render: function(){
    return(
      <TemplateComponent>
        <CartComponent cartItems={this.state.cartItems}/>
      </TemplateComponent>
    )
  }
});

module.exports = {
  CartContainer: CartContainer
}
