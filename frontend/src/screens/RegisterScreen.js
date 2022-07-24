import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/userActions';
import { clearErrors } from '../actions/errorActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class RegisterScreen extends Component {
   state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      msg: null,
   };

   componentDidUpdate(prevProps) {
      const { error, isAuthenticated } = this.props;
      if (error !== prevProps.error) {
         if (error.message !== null) {
            this.setState({ msg: error.message });
         } else {
            this.setState({ msg: null });
         }
      }

      if (isAuthenticated) {
         this.props.history.push('/');
         this.props.clearErrors();
      }
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const { name, email, password, confirmPassword } = this.state;

      //   Simple Validation
      if (password !== confirmPassword) {
         return this.setState({ msg: 'Password do not match!' });
      }

      const newUser = {
         name,
         email,
         password,
         confirmPassword,
      };

      // Attempt registration
      this.props.registerUser(newUser);
   };

   render() {
      const { name, email, password, confirmPassword, msg } = this.state;
      const { userLoading } = this.props;
      return (
         <div className="auth-page container">
            <h1>Sign Up</h1>
            {userLoading && <Loader />}
            {msg ? <ErrorMessage message={msg} /> : ''}
            <form onSubmit={this.onSubmit}>
               <div>
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     placeholder="Enter Name"
                     id="name"
                     name="name"
                     value={name}
                     onChange={this.onChange}
                  />
               </div>
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
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     placeholder="Enter Password"
                     id="password"
                     name="password"
                     value={password}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                     type="password"
                     placeholder="Confirm Password"
                     id="confirmPassword"
                     name="confirmPassword"
                     value={confirmPassword}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <button className="btn btn-primary">Sign Up</button>
               </div>
               <p>
                  Already have an account? <Link to="/login">Login</Link>
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
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
   RegisterScreen
);
