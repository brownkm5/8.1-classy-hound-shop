var React = require('react');

var TemplateComponent = require('./template.jsx');

var CartComponent = React.createClass({
  handleRemove: function(item){

    var cartOrder = JSON.parse(localStorage.getItem('order'));

    for ( var i = 0; i < cartOrder.length; i++ ) {
        if ( cartOrder[i].title === item.title ) {
            // remove the object with item.title from the array
            cartOrder.splice(i,1);
        }
    }

    // insert the new stringified array into LocalStorage
    localStorage.order = JSON.stringify(cartOrder);

  },
  render: function(){
    var self = this;
    var cartData = this.props.cartItems.map(function(item){
      return(
        <tr key={item.item.title}>
          <th>{item.item.title}</th>
          <td>{item.size}</td>
          <td>{item.quantity}</td>
          <td>Still in work</td>
          <td><button onClick={function(){self.handleRemove(item)}} type="button" className="btn btn-warning">Remove</button></td>
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
    var cartArray = cartItems;
    console.log('cart', cartArray);
    return{
      cartItems: cartItems
    }
  },
  handleRemove: function(item){
    console.log(item);
    console.log(this.state.cartItems);
  },
  render: function(){
    return(
      <TemplateComponent>
        <CartComponent handleRemove={this.handleRemove} cartItems={this.state.cartItems || []}/>
      </TemplateComponent>
    )
  }
});

module.exports = {
  CartContainer: CartContainer
}
