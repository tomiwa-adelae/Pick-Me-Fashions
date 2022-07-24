import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import CartItem from '../components/CartItem';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class CartScreen extends Component {
   componentDidMount() {
      const id = this.props.match.params.id;
      const qty = this.props.location.search
         ? Number(this.props.location.search.split('=')[1])
         : '1';

      if (id) {
         this.props.addToCart(id, qty);
      } else {
         return;
      }
   }

   componentDidUpdate(prevProps) {
      const { cartItems } = this.props;
      if (cartItems !== prevProps.cartItems) {
         this.props.history.push('/cart');
      }
   }

   checkOutHandler = (e) => {
      const { user } = this.props;
      if (!user) {
         this.props.history.push(`/login?redirect=shipping`);
      } else {
         this.props.history.push(`/shipping`);
      }
   };

   render() {
      const { cartLoading, cartItems, error } = this.props;
      return (
         <div className="cart-page">
            {cartLoading ? (
               <Loader />
            ) : error.message !== null ? (
               <ErrorMessage message={error.message} />
            ) : (
               <div className="cart">
                  <div className="cart-content">
                     <h1>Shopping Cart</h1>
                     {cartItems.length === 0 ? (
                        <div className="alert">
                           Your cart is empty. <Link to="/">Go Back</Link>
                        </div>
                     ) : (
                        <div className="cart-items">
                           {cartItems.map((item) => (
                              <CartItem key={item.id} item={item} />
                           ))}
                        </div>
                     )}
                  </div>
                  <div className="box">
                     <div className="title">
                        <h3>
                           Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)})
                           items
                        </h3>
                        <h4>
                           #{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                        </h4>
                     </div>
                     <div className="button">
                        <button
                           onClick={this.checkOutHandler}
                           disabled={cartItems.length <= 0}
                           className="btn btn-primary"
                        >
                           Proceed to checkout
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   cartLoading: state.cart.cartLoading,
   cartItems: state.cart.cartItems,
   error: state.error,
   user: state.user.user,
});

export default connect(mapStateToProps, { addToCart })(CartScreen);
