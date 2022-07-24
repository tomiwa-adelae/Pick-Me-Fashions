import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import { Link } from 'react-router-dom';

class Header extends Component {
   state = {
      show: false,
      showAdmin: false,
      openNav: false,
   };

   showContainer = React.createRef();
   state = {
      show: false,
   };

   showAdminContainer = React.createRef();
   state = {
      showAdmin: false,
   };

   componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
   }

   handleClickOutside = (e) => {
      if (
         this.showContainer.current &&
         !this.showContainer.current.contains(e.target)
      ) {
         this.setState({ show: false });
      }

      if (
         this.showAdminContainer.current &&
         !this.showAdminContainer.current.contains(e.target)
      ) {
         this.setState({ showAdmin: false });
      }
   };

   showDropDown = () => {
      this.setState({ show: !this.state.show });
   };

   showAdminDropDown = () => {
      this.setState({ showAdmin: !this.state.showAdmin });
   };

   logout = () => {
      this.props.logout();
   };

   toggleNav = () => {
      this.setState({ openNav: !this.state.openNav });
   };

   closeNav = () => {
      this.setState({ openNav: !this.state.openNav });
   };

   render() {
      const { user } = this.props;
      return (
         <header>
            <div className="header-container">
               <div className="header">
                  <div
                     onClick={this.toggleNav}
                     className={this.state.openNav ? 'burger close' : 'burger'}
                  >
                     <div className="line-1"></div>
                     <div className="line-2"></div>
                     <div className="line-3"></div>
                  </div>
                  <div className="logo">
                     <Link
                        onClick={() => this.setState({ openNav: false })}
                        to="/"
                     >
                        <h3>Pick Me</h3>
                     </Link>
                  </div>
                  <div className={this.state.openNav ? 'icons open' : 'icons'}>
                     <div className="cart">
                        <Link onClick={this.closeNav} to="/cart">
                           <i className="fas fa-shopping-cart"></i> Cart
                        </Link>
                     </div>
                     {user ? (
                        <>
                           <div ref={this.showContainer} className="user">
                              <Link onClick={this.showDropDown} to="#">
                                 {user.name}{' '}
                                 <i className="fas fa-caret-down"></i>
                              </Link>
                              <ul
                                 className={
                                    this.state.show
                                       ? 'drop-down'
                                       : 'hide-drop-down'
                                 }
                              >
                                 <li>
                                    <Link onClick={this.closeNav} to="/profile">
                                       Profile
                                    </Link>
                                 </li>
                                 <li>
                                    <Link
                                       onClick={this.closeNav}
                                       to="/myorders"
                                    >
                                       My Orders
                                    </Link>
                                 </li>
                                 <li onClick={this.logout}>
                                    <Link onClick={this.closeNav} to="#">
                                       Logout
                                    </Link>
                                 </li>
                              </ul>
                           </div>
                           {user.isAdmin ? (
                              <div
                                 ref={this.showAdminContainer}
                                 className="admin"
                              >
                                 <Link onClick={this.showAdminDropDown} to="#">
                                    Admin <i className="fas fa-caret-down"></i>
                                 </Link>
                                 <ul
                                    className={
                                       this.state.showAdmin
                                          ? 'drop-down'
                                          : 'hide-drop-down'
                                    }
                                 >
                                    <li>
                                       <Link
                                          onClick={this.closeNav}
                                          to="/admin-user-list"
                                       >
                                          User
                                       </Link>
                                    </li>
                                    <li>
                                       <Link
                                          onClick={this.closeNav}
                                          to="/admin-product-list"
                                       >
                                          Products
                                       </Link>
                                    </li>
                                    <li>
                                       <Link
                                          onClick={this.closeNav}
                                          to="/admin-order-list"
                                       >
                                          Order
                                       </Link>
                                    </li>
                                 </ul>
                              </div>
                           ) : null}
                        </>
                     ) : (
                        <div className="sign-in">
                           <Link onClick={this.closeNav} to="/login">
                              <i className="fas fa-user"></i> Sign In
                           </Link>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </header>
      );
   }
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.user.isAuthenticated,
   user: state.user.user,
});

export default connect(mapStateToProps, { logout })(Header);
