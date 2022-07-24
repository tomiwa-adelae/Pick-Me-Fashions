import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser } from '../actions/userActions';
import Loader from '../components/Loader';

class AdminUserEditScreen extends Component {
   state = {
      id: '',
      name: '',
      email: '',
      isAdmin: '',
   };
   componentDidMount() {
      const { user } = this.props;

      const id = this.props.match.params.id;

      if (!user || !user.isAdmin) {
         return this.props.history.push('/login');
      }

      this.props.getUser(id);
   }

   componentDidUpdate(prevProps) {
      const { isAuthenticated, singleUser, updateSuccess } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }

      if (singleUser !== prevProps.singleUser) {
         return this.setState({
            isAdmin: singleUser.isAdmin,
            name: singleUser.name,
            email: singleUser.email,
            id: singleUser._id,
         });
      }

      if (updateSuccess) {
         return this.props.history.push('/admin-user-list');
      }
   }

   onChange = () => {
      this.setState({ isAdmin: !this.state.isAdmin });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const { id } = this.state;

      const updatedUser = {
         isAdmin: this.state.isAdmin,
      };

      this.props.updateUser(id, updatedUser);
   };

   render() {
      const { userLoading } = this.props;
      const { name, email, isAdmin } = this.state;
      return (
         <div className="admin-user-edit">
            <h1>User Edit</h1>
            {userLoading && <Loader />}
            <form onSubmit={this.onSubmit}>
               <div className="box">
                  <label htmlFor="name">Name</label>
                  <div>{name}</div>
               </div>
               <div className="box">
                  <label htmlFor="email">Email Address</label>
                  <div>{email}</div>
               </div>
               <div className="checkbox">
                  <input
                     value={isAdmin}
                     onChange={this.onChange}
                     checked={isAdmin}
                     type="checkbox"
                     name="isAdmin"
                     id="isAdmin"
                  />
                  <label htmlFor="isAdmin">Is Admin</label>
               </div>
               <div>
                  <button className="btn btn-primary">Update User</button>
               </div>
            </form>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   singleUser: state.user.singleUser,
   userLoading: state.user.userLoading,
   updateSuccess: state.user.updateSuccess,
});

export default connect(mapStateToProps, { getUser, updateUser })(
   AdminUserEditScreen
);
