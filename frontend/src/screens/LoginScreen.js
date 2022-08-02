import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { clearErrors } from '../actions/errorActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class LoginScreen extends Component {
   state = {
      email: '',
      password: '',
   };

   componentDidMount() {
      this.props.clearErrors();
   }

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

      const { email, password } = this.state;

      const user = {
         email,
         password,
      };

      // Attempt login
      this.props.loginUser(user);
   };

   render() {
      const { email, password } = this.state;
      const { error, userLoading } = this.props;
      return (
         <div className="auth-page container">
            <h1>Sign In</h1>
            {userLoading && <Loader />}
            {error.message !== null && <ErrorMessage message={error.message} />}
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
                  <button className="btn btn-primary">Sign In</button>
               </div>
               <p>
                  New Customer? <Link to="/register">Register</Link>
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

export default connect(mapStateToProps, { loginUser, clearErrors })(
   LoginScreen
);
