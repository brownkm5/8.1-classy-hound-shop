var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');

var OrderItem = Backbone.Model.extend({
  idAttribute: '_id'
});

var OrderCollection = Backbone.Collection.extend({
  model: OrderItem,
  localStorage: new Backbone.LocalStorage('order'), // Unique name within your app.
});

module.exports = {
  OrderCollection: OrderCollection
}
