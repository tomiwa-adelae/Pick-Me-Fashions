import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSteps from '../components/CheckOutSteps';
import { createOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Message from '../components/Message';

class PlaceOrderScreen extends Component {
   componentDidMount() {
      const { user, shippingAddress, paymentMethod } = this.props;

      if (!user) {
         return this.props.history.push('/login');
      }

      if (!shippingAddress) {
         return this.props.history.push('/shipping');
      }

      if (!paymentMethod) {
         return this.props.history.push('/payment');
      }
   }

   componentDidUpdate() {
      const { isAuthenticated, order } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }

      if (order !== null) {
         // return this.props.history.push(`/order/${order._id}`);
         return this.props.history.push(`/order-success`);
      }
   }

   placeOrder = () => {
      const { cartItems, shippingAddress, paymentMethod, user } = this.props;

      const toPrice = (num) => Number(num.toFixed(2));
      const itemPrice = toPrice(
         cartItems.reduce((a, c) => a + c.qty * c.price, 0)
      );

      const shippingPrice = toPrice(
         itemPrice < 1000 ? toPrice(0) : toPrice(10)
      );

      const totalPrice = toPrice(itemPrice + shippingPrice);

      const newOrder = {
         orderItems: cartItems,
         shippingAddress,
         paymentMethod,
         itemPrice,
         shippingPrice,
         totalPrice,
         user: user.id,
         userObject: user,
      };

      this.props.createOrder(newOrder);
   };

   render() {
      const { cartItems, shippingAddress, paymentMethod, orderLoading, error } =
         this.props;
      const { address, city, country, phoneNumber } = shippingAddress;

      const toPrice = (num) => Number(num.toFixed(2));
      const itemPrice = toPrice(
         cartItems.reduce((a, c) => a + c.qty * c.price, 0)
      );

      const shippingPrice = toPrice(
         itemPrice < 1000 ? toPrice(0) : toPrice(10)
      );

      const totalPrice = toPrice(itemPrice + shippingPrice);

      return (
         <div className="confirm-order-page">
            <CheckoutSteps step1 step2 step3 step4 />
            {error.message !== null && error.message !== 'Cart is empty!' ? (
               <ErrorMessage message={error.message} />
            ) : null}
            <div className="confirm">
               <div className="place-order">
                  <div className="boxes">
                     <div className="box">
                        <h3>Shipping</h3>
                        <p>
                           Address : {address}, {city}, {country} {}
                        </p>
                        <p>Phone Number : {phoneNumber}</p>
                     </div>
                     <div className="box">
                        <h3>Payment Method</h3>
                        <p>Method : {paymentMethod}</p>
                     </div>
                     <div className="box">
                        <h3>Order Item(s)</h3>
                        {error.message !== null &&
                        error.message === 'Cart is empty!' ? (
                           <Message message={error.message} />
                        ) : (
                           ''
                        )}
                        {cartItems.map((item) => (
                           <div key={item.id} className="item-box">
                              <div className="img">
                                 <img src={item.image} alt={item.name} />
                              </div>
                              <div>
                                 <h5>{item.name}</h5>
                              </div>
                              <div className="qty">
                                 <h5>
                                    {item.qty} x {item.price} = #
                                    {item.qty * item.price}
                                 </h5>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="summary-box">
                  <div className="box">
                     <div>
                        <h3>Order Summary</h3>
                     </div>
                     <div>
                        <p>Items:</p>
                        <span>#{itemPrice}</span>
                     </div>
                     <div>
                        <p>Shipping:</p>
                        <span>#{shippingPrice}</span>
                     </div>
                     <div>
                        <p>Total:</p>
                        <span>#{totalPrice}</span>
                     </div>
                     <div onClick={this.placeOrder} className="box-btn">
                        <button className="btn btn-primary">Place Order</button>
                        {orderLoading && <Loader />}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   cartItems: state.cart.cartItems,
   shippingAddress: state.shipping.shippingAddress,
   paymentMethod: state.shipping.paymentMethod,
   order: state.orders.order,
   orderLoading: state.orders.orderLoading,
   error: state.error,
});

export default connect(mapStateToProps, { createOrder })(PlaceOrderScreen);
