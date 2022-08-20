import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Message from '../components/Message';
import { PayPalButton } from 'react-paypal-button-v2';
import { getOrder, payOrder } from '../actions/orderActions';

class OrderReviewScreen extends Component {
   state = {
      sdk: false,
   };

   componentDidMount() {
      const id = this.props.match.params.id;

      const { user, order } = this.props;

      if (!user) {
         return this.props.history.push('/login');
      }

      const addPayPalScript = async () => {
         const { data: clientId } = await axios.get('/api/config/paypal');
         const script = document.createElement('script');
         script.type = 'text/javascript';
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
         script.async = true;
         script.onload = () => {
            this.setState({ sdk: true });
         };
         document.body.appendChild(script);
      };

      if (!order || order._id !== id) {
         this.props.getOrder(id);
      } else if (!order.isPaid) {
         if (!window.paypal) {
            addPayPalScript();
         } else {
            this.setState({ sdk: true });
         }
      } else {
         return;
      }
   }

   componentDidUpdate() {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }
   }

   successPaymentHandler = (paymentResult) => {
      const { order } = this.props;
      this.props.payOrder(order._id, paymentResult);
   };
   render() {
      const { order, orderLoading, error, loadingPay } = this.props;
      return (
         <div className="order-review-page">
            <div className="order-review">
               {orderLoading ? (
                  <Loader />
               ) : error.message !== null ? (
                  <ErrorMessage message={error.message} />
               ) : order === null ? (
                  <Loader />
               ) : (
                  <>
                     <h1>Order {order._id}</h1>
                     <div className="boxes">
                        <div className="box">
                           <h3>Shipping</h3>
                           <p>Name: {order.userObject.name}</p>
                           <p>Email: {order.userObject.email} </p>
                           <p>
                              Address: {order.shippingAddress.address},{' '}
                              {order.shippingAddress.city},{' '}
                              {order.shippingAddress.country}{' '}
                           </p>
                           <p>
                              Phone Number: {order.shippingAddress.phoneNumber}
                           </p>
                           {order.isDelivered ? (
                              <Message
                                 message={`Delivered at ${order.deliveredAt}`}
                              />
                           ) : (
                              <ErrorMessage message="Not Delivered" />
                           )}
                        </div>
                        <div className="box">
                           <h3>Payment Method</h3>
                           <p>Method: {order.paymentMethod}</p>
                           {order.isPaid ? (
                              <Message message={`Paid at ${order.paidAt}`} />
                           ) : (
                              <ErrorMessage message="Not Paid" />
                           )}
                        </div>
                        <div className="box">
                           <h3>Order Items</h3>
                           {order.orderItems.map((item) => (
                              <div key={item._id} className="item-box">
                                 <div className="img">
                                    <img src={item.image} alt={item.name} />
                                 </div>
                                 <div className="name">
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
                  </>
               )}
            </div>
            <div className="summary-box">
               {error.message !== null ? (
                  ''
               ) : order === null ? (
                  <Loader />
               ) : (
                  <div className="box">
                     <div>
                        <h3>Order Summary</h3>
                     </div>
                     <div>
                        <p>Items:</p>
                        <span>#{order.itemPrice}</span>
                     </div>
                     <div>
                        <p>Shipping:</p>
                        <span>#{order.shippingPrice}</span>
                     </div>
                     <div>
                        <p>Total:</p>
                        <span>#{order.totalPrice}</span>
                     </div>
                     {!order.isPaid ? (
                        order.paymentMethod === 'PayPal' ? (
                           <div className="box-btn">
                              {loadingPay && <Loader />}
                              <PayPalButton
                                 amount={order.totalPrice}
                                 onSuccess={this.successPaymentHandler}
                              />
                           </div>
                        ) : null
                     ) : (
                        ''
                     )}
                  </div>
               )}
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   order: state.orders.order,
   orderLoading: state.orders.orderLoading,
   error: state.error,
   loadingPay: state.orders.loading,
   successPay: state.orders.success,
});

export default connect(mapStateToProps, { getOrder, payOrder })(
   OrderReviewScreen
);
