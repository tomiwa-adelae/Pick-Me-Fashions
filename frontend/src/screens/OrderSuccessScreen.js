import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NotFoundScreen from './NotFoundScreen';

class OrderSuccessScreen extends Component {
   componentDidMount() {
      const { user } = this.props;

      if (!user) {
         return this.props.history.push('/login');
      }
   }

   componentDidUpdate() {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }
   }

   render() {
      const { name } = this.props.user;
      const { order } = this.props;
      return (
         <>
            {order ? (
               <div className="order-success-screen">
                  <h1>Dear {name},</h1>
                  <p>
                     Your order <b className="text-primary">{order?._id}</b> has
                     been placed Successfully! Pick me fashions will get back to
                     you as soon as possible!{' '}
                  </p>
                  <h4>Best regards, Pick me Fashions</h4>
                  <div className="buttons">
                     <Link to="/" className="btn btn-primary">
                        Continue shopping
                     </Link>
                     <Link
                        to={`/order/${order?._id}`}
                        className="btn btn-primary"
                     >
                        View Order details
                     </Link>
                  </div>
               </div>
            ) : (
               <NotFoundScreen />
            )}
         </>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   error: state.error,
   order: state.orders.order,
});

export default connect(mapStateToProps, null)(OrderSuccessScreen);
