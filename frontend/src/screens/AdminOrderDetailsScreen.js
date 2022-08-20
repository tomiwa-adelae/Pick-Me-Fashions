import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ErrorMessage from '../components/ErrorMessage';
import { getOrder, deliverOrder, payCashOrder } from '../actions/orderActions';

class AdminOrderDetailsScreen extends Component {
   componentDidMount() {
      const id = this.props.match.params.id;

      const { user } = this.props;

      if (!user || !user.isAdmin) {
         return this.props.history.push('/login');
      }

      this.props.getOrder(id);
   }

   componentDidUpdate() {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }
   }

   markPaid = () => {
      const { order } = this.props;

      this.props.payCashOrder(order._id);
   };

   markDelivered = () => {
      const { order } = this.props;
      this.props.deliverOrder(order);
   };

   render() {
      const { order, orderLoading, loadingDeliver, loadingPay, error } =
         this.props;
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
                     <h1>Order {order._id} </h1>
                     <div className="boxes">
                        <div className="box">
                           <h3>Shipping</h3>
                           <p>Name: {order.userObject.name} </p>
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
                              <ErrorMessage message="Not Delivered!" />
                           )}
                        </div>
                        <div className="box">
                           <h3>Payment Method</h3>
                           <p>Method: {order.paymentMethod}</p>
                           {order.isPaid ? (
                              <Message message={`Paid at ${order.paidAt}`} />
                           ) : (
                              <ErrorMessage message="Not Paid!" />
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
                                    <h5> {item.name} </h5>
                                 </div>
                                 <div className="qty">
                                    <h5>
                                       {item.qty} x {item.price} = #{' '}
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
                        <span># {order.itemPrice} </span>
                     </div>
                     <div>
                        <p>Shipping:</p>
                        <span># {order.shippingPrice} </span>
                     </div>
                     <div>
                        <p>Total:</p>
                        <span>
                           <b># {order.totalPrice}</b>{' '}
                        </span>
                     </div>
                     {!order.isPaid ? (
                        order.paymentMethod === 'Cash on Delivery' ? (
                           <div className="box-btn">
                              <button
                                 onClick={this.markPaid}
                                 className="btn btn-primary"
                              >
                                 Mark as Paid
                              </button>
                              {loadingPay && <Loader />}
                           </div>
                        ) : null
                     ) : null}
                     {order.isPaid ? (
                        order.isDelivered ? null : (
                           <div className="box-btn">
                              <button
                                 onClick={this.markDelivered}
                                 className="btn btn-primary"
                              >
                                 Mark as Delivered
                              </button>
                              {loadingDeliver && <Loader />}
                           </div>
                        )
                     ) : null}
                  </div>
               )}
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.user.isAuthenticated,
   user: state.user.user,
   order: state.orders.order,
   orderLoading: state.orders.orderLoading,
   loadingDeliver: state.orders.loadingDelivered,
   successdeliver: state.orders.successDelivered,
   loadingPay: state.orders.loading,
   successPay: state.orders.success,
   error: state.error,
});

export default connect(mapStateToProps, {
   getOrder,
   deliverOrder,
   payCashOrder,
})(AdminOrderDetailsScreen);
