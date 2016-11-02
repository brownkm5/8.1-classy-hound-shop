var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

// var LoginModal = require('./components/login.jsx').LoginModal;
var TemplateComponent = require('./components/template.jsx');
var CatalogContainer = require('./components/catalog.jsx').CatalogContainer;
var CartContainer = require('./components/cart.jsx').CartContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'cart/': 'cart'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(CatalogContainer, {testing:this.testing}),
      document.getElementById('app')
    );
  },
  cart: function(){
    ReactDOM.render(
      React.createElement(CartContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
