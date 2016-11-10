var React = require('react');

var TemplateComponent = require('./template.jsx');
var OrderCollection = require('../models/model.js').OrderCollection;
var Modal = require('react-modal');
require('react-bootstrap');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '500px'
  }
};

var LoginModal = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: this.props.open,
      username: this.props.username,
      isHidden: false
    };
  },
  //check for logged in when component is mounted, if not then load the modal
  componentWillMount: function(){
    this.handleModal();
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({username: nextProps.username});
    console.log(this.state.username);
    this.handleModal();
  },
  handleModal: function(){
    var self = this;
    var username = localStorage.getItem('username');
    //open modal if there is no username
    if (!username) {
      self.setState({modalIsOpen: true});
    }
    else {
      self.setState({modalIsOpen: false});
    }
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },
  closeModal: function(e) {
    this.setState({modalIsOpen: false,
    username: e.target.value});
    // localStorage.setItem('loggedIn', this.state.username);
  },
  handleUsername: function(e){
    var self = this;
    var username = e.target.value;
    this.setState({username: username});
    if (this.state.username) {
      self.setState({isHidden:true});
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.handleUsername(this.state.username);
  },
  render: function(){
    //used for the jumbotron-div classname to hide the log in button if there is already a username
    var username = localStorage.getItem('username');
    return (
      <div className={username ? 'hidden' : ''}>
        <div className="jumbotron">
          <div className="container">

            <button onClick={this.openModal} type="button" data-target=".bd-example-modal-lg" className="btn btn-success btn-lg">Log In</button>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2>Please Log In</h2>
              <form onSubmit={this.handleSubmit} className="form-group">
                  <label htmlFor="userName">Username</label>
                  <input onChange={this.handleUsername} type="text" className="form-control" id="userName" placeholder="Username" />
                <button type="submit" value={this.state.username} className="btn btn-primary">Save Username</button>
              </form>
          </Modal>
        </div>
      </div>
    );
  }
});

var CatalogComponent = React.createClass({
  getInitialState: function(){
    var quantity;
    var size;
    return {
      quantity: quantity,
      size: size
    }
  },
  handleQuantity:function(e){
  var quantity = e.target.value;
  this.setState({quantity: quantity});
  },
  handleSize: function(e){
    this.setState({size: e.target.value});
  },
  render: function(){
    // console.log(this.props);
    var self = this;
    var paintings = this.props.paintings;
    var quantity = this.state.quantity;

    var paintingInfo = paintings.map(function(item){
      var price = (item.price).toFixed(2);
      return (
        <div key={item.title}>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={item.image} alt="picture" />
              <div className="caption">
                <div className="title-price">
                  <p id='title'>{item.title}</p>
                  <p id='price'>$ {price}</p>
                </div>
                <div className="form-inline">
                  <input onChange={self.handleQuantity} type="text" id='quantity' className="form-control" placeholder="Quantity" />
                  <select onChange={self.handleSize} className="form-control">
                    <option>Size</option>
                    <option>4" x 6"</option>
                    <option>6" x 4"</option>
                    <option>8" x 10"</option>
                    <option>12" x 12"</option>
                  </select>
                  <a href="#" onClick={function(){self.props.handleAddToCart(item, self.state.quantity, self.state.size)}} className="btn btn-default" role="button">Add to Cart</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });
    // console.log(paintingInfo);
    return(
      <div>
        <div>{paintingInfo}</div>
      </div>
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
      paintings: paintingArray,
      username: '',

    }
  },
  handleQuantity: function(quantity){
    var quantity  = e.target.value;
    console.log(quantity);
  },
  handleAddToCart: function(item, quantity, size){
    // console.log(item);
    var orderCollection = this.state.orderCollection;
    console.log(quantity);
    orderCollection.create({item: item, quantity: quantity, size:size});
    this.updateOrder();
    console.log(orderCollection);
    this.setState({orderCollection: orderCollection});

  },
  updateOrder: function(){
    var orderCollection = this.state.orderCollection;
    var orderData = JSON.stringify(orderCollection.toJSON());
    localStorage.setItem('order', orderData);
  },
  handleUsername: function(username){
    this.setState({username: username});
    localStorage.setItem('username', username);

  },
  render: function(){
    return(
      <TemplateComponent>
        <LoginModal username={this.state.username} handleUsername={this.handleUsername} />
        <CatalogComponent paintings={this.state.paintings} handleAddToCart={this.handleAddToCart}/>
      </TemplateComponent>
    );
  }
});

module.exports = {
  CatalogContainer: CatalogContainer
}
