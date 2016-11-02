var React = require('react');

var TemplateComponent = require('./template.jsx');
var OrderCollection = require('../models/model.js').OrderCollection;

var CatalogComponent = React.createClass({
  initialize: function(){
    console.log('working');
    return (
      <div className="modal fade" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
              <h4 className="modal-title">Modal title</h4>
            </div>
            <div className="modal-body">

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  render: function(){
    // console.log(this.props);
    var self = this;
    var paintings = this.props.paintings;
    // console.log(paintings);
    var paintingInfo = paintings.map(function(item){
      return (
        <div key={item.title}>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={item.image} alt="picture" />
              <div className="caption">
                <div className="title-price">
                  <p id='title'>{item.title}</p>
                  <p id='price'>$ {item.price}</p>
                </div>
                <div className="form-inline">
                  <input type="text" id='quantity' className="form-control" placeholder="Quantity" />
                  <select className="form-control">
                    <option>Size</option>
                    <option>4" x 6"</option>
                    <option>6" x 4"</option>
                    <option>8" x 10"</option>
                    <option>12" x 12"</option>
                  </select>
                  <a href="#" onClick={function(){self.props.handleAddToCart(item)}} className="btn btn-default" role="button">Add to Cart</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });
    // console.log(paintingInfo);
    return(
      <div>{paintingInfo}</div>
    )
  }
});

var CatalogContainer = React.createClass({
  getInitialState: function(){
    var orderCollection = new OrderCollection();

    orderCollection.fetch();

    var paintingArray = [
      {title:'Welsh Corgi', price:53.50, image:'http://rlv.zcache.com/pembroke_welsh_corgi_popart_poster_print-rdb9f920667ba4ed99dab6edbe0a611ec_wvg_8byvr_324.jpg'},
      {title:'Boxer', price:49.45, image:"http://rlv.zcache.com/boxer_dog_posters-r2bc77a8d788f4339b7e7c34543a1878e_wvc_8byvr_324.jpg"},
      {title:'Bull Terrier', price:45.50, image:'http://rlv.zcache.com/bull_terrier_pop_art_print-r3f45caf28c7e4c9093623e26c572fba2_flxli_8byvr_324.jpg'},
      {title:'Pool Hall Dogs', price:50.55, image:'http://rlv.zcache.com/dogs_playing_pool_bulldog_up_poster-r08c3c9eca2f34ecba2adc78d1f3c87a5_bii_8byvr_512.jpg'},
      {title:'Dachsund and Duckling', price:8.15, image:'http://rlv.zcache.com/dachshund_and_duckling_dog_art_canvas_print-r6366b0347ff14c97bf7ee85b1bfc7c2f_2n0h_8byvr_512.jpg'},
      {title:'A Friend in Need', price:42.40, image:'http://rlv.zcache.com/a_friend_in_need_c_m_coolidge_dogs_playing_poker_poster-r6108c56217944aaabbc849aea1a103bd_izq_8byvr_512.jpg'},
      {title:'Bavarian Dog Poster', price:23.55, image:'http://rlv.zcache.com/bavarian_dog_poster-r76b40ad27ece4031ae11b5cf9f04ee16_js8_8byvr_512.jpg'},
      {title:'Yellow Dog w/ Beer Glass', price:42.40, image:'http://rlv.zcache.com/yellow_dog_with_a_beer_glass_on_its_nose_poster-r0669933b08154b53ac63c27cdf0a0a94_ag4l_8byvr_512.jpg'},
      {title:'Black Dog w/ Beer Glass', price:7.95, image:'http://rlv.zcache.com/black_dog_with_a_beer_glass_on_its_nose_poster-r21a096c3cfca492cb391111147a90540_ag4l_8byvr_512.jpg'}
    ];

    return {
      orderCollection: orderCollection,
      paintings: paintingArray
    }
  },
  handleAddToCart: function(item){
    console.log(item);
    var orderCollection = this.state.orderCollection;

    orderCollection.create(item);
    this.updateOrder();

    this.setState({orderCollection: orderCollection});

  },
  removeItem: function(item){
    var orderCollection = this.state.orderCollection;

    orderCollection.remove(item);
    this.updateOrder();
    this.setState({'orderCollection': orderCollection});
  },
  updateOrder: function(){
    var orderCollection = this.state.orderCollection;
    var orderData = JSON.stringify(orderCollection.toJSON());
    localStorage.setItem('order', orderData);
  },
  render: function(){
    return(
      <TemplateComponent>
        <CatalogComponent paintings={this.state.paintings} handleAddToCart={this.handleAddToCart}/>
      </TemplateComponent>
    );
  }
});

module.exports = {
  CatalogContainer: CatalogContainer
}
