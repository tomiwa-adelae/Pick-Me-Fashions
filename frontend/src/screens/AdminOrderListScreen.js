import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../actions/orderActions';
import { clearErrors } from '../actions/errorActions';
import Loader from '../components/Loader';
import Moment from 'react-moment';
import ErrorMessage from '../components/ErrorMessage';

class AdminOrderListScreen extends Component {
   componentDidMount() {
      const { user } = this.props;

      if (!user || !user.isAdmin) {
         return this.props.history.push('/login');
      }
      this.props.getOrders();
      this.props.clearErrors();
   }

   componentDidUpdate() {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }
   }

   getOrderDetails = (id) => {
      this.props.history.push(`/admin-order-details/${id}`);
   };
   render() {
      const { orders, orderLoading, error } = this.props;

      return (
         <div className="admin-order-list">
            <div className="header">
               <h1>Orders</h1>
            </div>
            {orderLoading ? (
               <Loader />
            ) : error.message !== null ? (
               <ErrorMessage message={error.message} />
            ) : orders.length === 0 ? (
               <div className="alert">Orders are empty!.</div>
            ) : (
               <div className="order">
                  <table cellSpacing="0">
                     <thead>
                        <tr>
                           <th>Id</th>
                           <th>User</th>
                           <th>Date</th>
                           <th>Total</th>
                           <th>Paid</th>
                           <th>Delivered</th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {orders.map((order) => (
                           <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{order.userObject.name}</td>
                              <td>
                                 {' '}
                                 <Moment format="MM-DD-YYYY">
                                    {order.orderDate}
                                 </Moment>
                              </td>
                              <td>#{order.totalPrice}</td>
                              <td>
                                 {order.isPaid ? (
                                    <Moment format="MM-DD-YYYY">
                                       {order.paidAt}
                                    </Moment>
                                 ) : (
                                    <i className="fas fa-times"></i>
                                 )}{' '}
                              </td>
                              <td>
                                 {order.isDelivered ? (
                                    <Moment format="MM-DD-YYYY">
                                       {order.deliveredAt}
                                    </Moment>
                                 ) : (
                                    <i className="fas fa-times"></i>
                                 )}{' '}
                              </td>
                              <td>
                                 <button
                                    onClick={this.getOrderDetails.bind(
                                       this,
                                       order._id
                                    )}
                                    className="btn btn-light"
                                 >
                                    Details
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>

                  <div className="mobile">
                     {orders.map((order) => (
                        <div
                           onClick={this.getOrderDetails.bind(this, order._id)}
                           key={order._id}
                           className="mobile-order"
                        >
                           <div className="img">
                              <img
                                 src={order.orderItems[0].image}
                                 alt={order.orderItems[0].name}
                              />
                           </div>
                           <div className="content">
                              <h3>{order.userObject.name}</h3>
                              <p>Order {order._id}</p>
                              <h4>
                                 {order.isPaid ? (
                                    <span
                                       style={{
                                          backgroundColor: '#28a745',
                                       }}
                                    >
                                       Paid
                                    </span>
                                 ) : (
                                    <span
                                       style={{
                                          backgroundColor: '#dc3545',
                                       }}
                                    >
                                       Not Paid
                                    </span>
                                 )}
                              </h4>
                              <h4>
                                 {order.isDelivered ? (
                                    <span
                                       style={{
                                          backgroundColor: '#28a745',
                                       }}
                                    >
                                       Delivered
                                    </span>
                                 ) : (
                                    <span
                                       style={{
                                          backgroundColor: '#dc3545',
                                       }}
                                    >
                                       Not Delivered
                                    </span>
                                 )}
                              </h4>
                              <p>Order date - {order.orderDate}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   orders: state.orders.orders,
   orderLoading: state.orders.orderLoading,
   error: state.error,
});

export default connect(mapStateToProps, { getOrders, clearErrors })(
   AdminOrderListScreen
);
