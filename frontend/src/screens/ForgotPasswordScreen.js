import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword } from '../actions/userActions';
import { clearErrors } from '../actions/errorActions';
import ErrorMessage from '../components/ErrorMessage';
import Message from '../components/Message';
import Loader from '../components/Loader';

class ForgotPasswordScreen extends Component {
   state = {
      email: '',
   };

   componentDidUpdate() {
      if (this.props.isAuthenticated) {
         this.props.history.push('/');
         this.props.clearErrors();
      }

      const redirect = this.props.location.search
         ? this.props.location.search.split('=')[1]
         : '/';

      if (this.props.isAuthenticated === true) {
         return this.props.history.push(redirect);
      }
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const { email } = this.state;

      // Attempt login
      // console.log({ email });
      this.props.forgotPassword({ email });
   };

   render() {
      const { email } = this.state;
      const { error, userLoading, successMsg } = this.props;
      return (
         <div className="auth-page container">
            <h1>Forgot Password</h1>
            {userLoading && <Loader />}
            {error.message !== null && <ErrorMessage message={error.message} />}
            {successMsg && <Message message={successMsg} />}
            <form onSubmit={this.onSubmit}>
               <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                     type="email"
                     placeholder="Enter Email"
                     id="email"
                     name="email"
                     value={email}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <button className="btn btn-primary">Submit</button>
               </div>
               <p>
                  Already remember password? <Link to="/login">Login</Link>
               </p>
            </form>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   error: state.error,
   userLoading: state.user.userLoading,
   isAuthenticated: state.user.isAuthenticated,
   successMsg: state.user.successMsg,
});

export default connect(mapStateToProps, { forgotPassword, clearErrors })(
   ForgotPasswordScreen
);
