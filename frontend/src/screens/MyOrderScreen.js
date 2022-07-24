import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class MyOrderScreen extends Component {
   componentDidMount() {
      const { user } = this.props;

      if (!user) {
         return this.props.history.push('/login');
      }
      this.props.listMyOrders();
   }

   componentDidUpdate() {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }
   }

   getOrderDetails = (id) => {
      this.props.history.push(`/order/${id}`);
   };

   render() {
      const { myOrders, orderLoading, error } = this.props;
      return (
         <div className="myorder-page">
            <h1>My Orders</h1>

            {orderLoading ? (
               <Loader />
            ) : error.message !== null ? (
               <ErrorMessage message={error.message} />
            ) : (
               <div className="myorder">
                  {myOrders.length === 0 ? (
                     <div className="alert">Your order list is empty</div>
                  ) : (
                     <>
                        <table cellSpacing="0">
                           <thead>
                              <tr>
                                 <th>Id</th>
                                 <th>Date</th>
                                 <th>Total</th>
                                 <th>Paid</th>
                                 <th>Delivered</th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody>
                              {myOrders.map((order) => (
                                 <tr key={order._id}>
                                    <td> {order._id} </td>
                                    <td>
                                       {' '}
                                       <Moment format="MM-DD-YYYY">
                                          {order.orderDate}
                                       </Moment>{' '}
                                    </td>
                                    <td> #{order.totalPrice} </td>
                                    <td>
                                       {' '}
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
                                       )}
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
                           {myOrders.map((order) => (
                              <div
                                 onClick={this.getOrderDetails.bind(
                                    this,
                                    order._id
                                 )}
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
                                    <h3>{order.orderItems[0].name}</h3>
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
                     </>
                  )}
               </div>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   myOrders: state.orders.myOrders,
   orderLoading: state.orders.orderLoading,
   error: state.error,
});

export default connect(mapStateToProps, { listMyOrders })(MyOrderScreen);
