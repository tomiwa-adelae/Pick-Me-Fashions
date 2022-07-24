import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserProfile } from '../actions/userActions';
import ErrorMessage from '../components/ErrorMessage';
import Message from '../components/Message';
import Loader from '../components/Loader';

class ProfileScreen extends Component {
   state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   };

   componentDidMount() {
      const { user } = this.props;
      if (!user) {
         this.props.history.push('/login');
      } else {
         this.setState({ name: user.name, email: user.email });
      }
   }

   componentDidUpdate() {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const { name, email, password, confirmPassword } = this.state;

      if (!name) {
         this.setState({ errorMsg: 'Please enter your name!' });
      } else if (!email) {
         this.setState({ errorMsg: 'Please enter your email!' });
      } else if (!password) {
         this.setState({ errorMsg: 'Please enter your password!' });
      } else if (password !== confirmPassword) {
         this.setState({ errorMsg: 'Password do not match!' });
      } else if (password.length <= 5) {
         this.setState({
            errorMsg: 'Password should be at least 6 character!',
         });
      } else {
         const updatedProfile = {
            name,
            email,
            password,
         };

         this.props.updateUserProfile(updatedProfile);
         this.setState({ errorMsg: null });
      }
   };

   render() {
      const { name, email, password, confirmPassword, errorMsg } = this.state;
      const { userUpdated, userLoading } = this.props;
      return (
         <div className="profile-page">
            <h1>User Profile</h1>
            {userLoading && <Loader />}
            {errorMsg && <ErrorMessage message={errorMsg} />}
            {userUpdated && <Message message="Profile Updated!" />}
            <form onSubmit={this.onSubmit}>
               <div>
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     name="name"
                     id="name"
                     value={name}
                     placeholder="Enter Name"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                     type="email"
                     name="email"
                     id="email"
                     value={email}
                     placeholder="Enter Email"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     value={password}
                     placeholder="Enter password"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                     type="password"
                     name="confirmPassword"
                     id="confirmPassword"
                     value={confirmPassword}
                     placeholder="Confirm Password"
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <button className="btn btn-primary">Update Profile</button>
               </div>
            </form>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   userUpdated: state.user.userUpdated,
   userLoading: state.user.userLoading,
});

export default connect(mapStateToProps, { updateUserProfile })(ProfileScreen);
