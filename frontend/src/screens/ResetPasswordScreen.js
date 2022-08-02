import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/userActions';
import { clearErrors } from '../actions/errorActions';
import ErrorMessage from '../components/ErrorMessage';
import Message from '../components/Message';
import Loader from '../components/Loader';
import axios from 'axios';
import NotFoundScreen from './NotFoundScreen';

class ResetPasswordScreen extends Component {
   state = {
      password: '',
      validUrl: true,
      loadingUrl: false,
      url: '',
   };

   componentDidMount() {
      this.setState({ loadingUrl: true });
      const id = this.props.match.params.id;
      const token = this.props.match.params.token;

      const url = `https://pickmefashions.herokuapp.com/api/password-reset/${id}/${token}`;

      this.setState({ url: url });
      axios
         .get(url)
         .then((res) => this.setState({ validUrl: true, loadingUrl: false }))
         .catch((err) => this.setState({ validUrl: false, loadingUrl: false }));
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

      const { password, url } = this.state;

      // Attempt login
      //   console.log({ password });
      this.props.resetPassword(url, password);
   };

   render() {
      const { password, loadingUrl, validUrl } = this.state;
      const { error, userLoading, successResetMsg } = this.props;
      return loadingUrl ? (
         <Loader />
      ) : validUrl ? (
         <div className="auth-page container">
            <h1>Reset Password</h1>
            {userLoading && <Loader />}
            {error.message !== null && <ErrorMessage message={error.message} />}
            {successResetMsg && <Message message={successResetMsg} />}

            <form onSubmit={this.onSubmit}>
               <div>
                  <label htmlFor="password">New Password</label>
                  <input
                     type="password"
                     placeholder="Enter new password"
                     id="password"
                     name="password"
                     value={password}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <button className="btn btn-primary">Reset password</button>
               </div>
               {successResetMsg && (
                  <p className="account">
                     <strong className="text-primary">
                        <Link to="/login">
                           Login now with your new password
                        </Link>
                     </strong>
                  </p>
               )}
            </form>
         </div>
      ) : (
         <NotFoundScreen />
      );
   }
}

const mapStateToProps = (state) => ({
   error: state.error,
   userLoading: state.user.userLoading,
   isAuthenticated: state.user.isAuthenticated,
   successResetMsg: state.user.successResetMsg,
});

export default connect(mapStateToProps, { resetPassword, clearErrors })(
   ResetPasswordScreen
);
