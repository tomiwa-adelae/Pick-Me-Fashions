import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

class CartItem extends Component {
   setQty = (id, e) => {
      this.props.addToCart(id, Number(e.target.value));
   };

   deleteItem = (id) => {
      this.props.removeFromCart(id);
   };

   render() {
      const { item } = this.props;
      return (
         <div className="item">
            <Link to={`/product/${item.id}`}>
               <div className="img">
                  <img src={item.image} alt={item.name} />
               </div>
            </Link>
            <Link to={`/product/${item.id}`}>
               <div className="name">
                  <h4>{item.name}</h4>
               </div>
            </Link>
            <div className="price">
               <h4>#{item.price}</h4>
            </div>
            <div className="select-box">
               <div className="select">
                  <select
                     value={item.qty}
                     onChange={this.setQty.bind(this, item.id)}
                  >
                     {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                           {x + 1}
                        </option>
                     ))}
                  </select>
                  <i className="fas fa-caret-down"></i>
               </div>
            </div>
            <div
               onClick={this.deleteItem.bind(this, item.id)}
               className="delete-btn"
            >
               <i className="fas fa-trash"></i>
            </div>
         </div>
      );
   }
}

export default connect(null, { addToCart, removeFromCart })(CartItem);
