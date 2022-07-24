import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList, deleteUser } from '../actions/userActions';
import { returnErrors } from '../actions/errorActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

class AdminUserListScreen extends Component {
   state = {
      errorMsg: null,
   };

   componentDidMount() {
      const { user } = this.props;

      if (!user || !user.isAdmin) {
         return this.props.history.push('/login');
      }

      this.props.getUserList();
   }

   componentDidUpdate() {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }
   }

   deleteUser = (id) => {
      const { user } = this.props;

      if (user.id === id) {
         this.setState({ errorMsg: 'Please, you cannot delete your account!' });
      } else {
         this.props.deleteUser(id);
         this.setState({ errorMsg: null });
      }
   };

   updateUser = (id) => {
      const { user } = this.props;

      if (user.id === id) {
         this.setState({ errorMsg: 'Please, you cannot edit your account!' });
      } else {
         this.props.history.push(`/admin-user-edit/${id}`);
         this.setState({ errorMsg: null });
      }
   };

   render() {
      const { userLoading, userList, error } = this.props;

      return (
         <div className="admin-user-list">
            <h1>User</h1>
            {this.state.errorMsg !== null && (
               <ErrorMessage message={this.state.errorMsg} />
            )}
            {userLoading ? (
               <Loader />
            ) : error.message !== null ? (
               <ErrorMessage message={error.message} />
            ) : userList.length === 0 ? (
               <div className="alert">Your User list is empty.</div>
            ) : (
               <div className="user">
                  <table cellSpacing="0">
                     <thead>
                        <tr>
                           <th>Id</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Is Admin</th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {userList.map((user) => (
                           <tr key={user._id}>
                              <td>{user._id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>
                                 {user.isAdmin ? (
                                    <i className="fas fa-check"></i>
                                 ) : (
                                    <i className="fas fa-times"></i>
                                 )}{' '}
                              </td>
                              <td className="icons">
                                 <i
                                    onClick={this.updateUser.bind(
                                       this,
                                       user._id
                                    )}
                                    className="fas fa-edit"
                                 ></i>
                                 <i
                                    onClick={this.deleteUser.bind(
                                       this,
                                       user._id
                                    )}
                                    className="fas fa-trash"
                                 ></i>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  <div className="mobile">
                     {userList.map((user) => (
                        <div key={user._id} className="mobile-user">
                           <h3>
                              <span>Name</span> - {user.name}
                           </h3>
                           <h3>
                              <span>Email</span> - {user.email}
                           </h3>
                           <h3>
                              <span>User Id</span> - {user._id}{' '}
                           </h3>
                           <h3>
                              <span>Is Admin</span> -{' '}
                              {user.isAdmin ? (
                                 <i
                                    style={{ color: '#28a745' }}
                                    className="fas fa-check"
                                 ></i>
                              ) : (
                                 <i
                                    style={{ color: '#dc3545' }}
                                    className="fas fa-times"
                                 ></i>
                              )}{' '}
                           </h3>
                           <div className="icons">
                              <i
                                 onClick={this.updateUser.bind(this, user._id)}
                                 className="fas fa-edit"
                              ></i>
                              <i
                                 onClick={this.deleteUser.bind(this, user._id)}
                                 className="fas fa-trash"
                              ></i>
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
   userLoading: state.user.userLoading,
   isAuthenticated: state.user.isAuthenticated,
   userList: state.user.userList,
   error: state.error,
});

export default connect(mapStateToProps, {
   getUserList,
   deleteUser,
   returnErrors,
})(AdminUserListScreen);
