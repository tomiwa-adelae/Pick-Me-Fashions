import React, { Component } from 'react';
import './css/style.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import { Provider } from 'react-redux';
import store from './store';
import CartScreen from './screens/CartScreen';
import AdminProductListScreen from './screens/AdminProductListScreen';
import AdminProductCreateScreen from './screens/AdminProductCreateScreen';
import AdminUserListScreen from './screens/AdminUserListScreen';
import AdminUserEditScreen from './screens/AdminUserEditScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderReviewScreen from './screens/OrderReviewScreen';
import AdminOrderListScreen from './screens/AdminOrderListScreen';
import AdminOrderDetailsScreen from './screens/AdminOrderDetailsScreen';
import MyOrderScreen from './screens/MyOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import ScrollToTop from './components/ScrollToTop';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <Header />
               <ScrollToTop />
               <main>
                  <div className="container">
                     <Switch>
                        <Route path="/" exact component={HomeScreen} />
                        <Route path="/login" component={LoginScreen} />
                        <Route path="/register" component={RegisterScreen} />
                        <Route
                           path="/product/:id"
                           component={ProductDetailsScreen}
                        />
                        <Route path="/cart/:id?" component={CartScreen} />
                        <Route path="/shipping" component={ShippingScreen} />
                        <Route path="/payment" component={PaymentScreen} />
                        <Route
                           path="/placeorder"
                           component={PlaceOrderScreen}
                        />
                        <Route
                           path="/order/:id"
                           component={OrderReviewScreen}
                        />
                        <Route path="/myorders" component={MyOrderScreen} />
                        <Route path="/profile" component={ProfileScreen} />

                        {/* Admin Routes */}
                        <Route
                           path="/admin-product-list"
                           component={AdminProductListScreen}
                        />
                        <Route
                           path="/admin-product-create"
                           component={AdminProductCreateScreen}
                        />
                        <Route
                           path="/admin-user-list"
                           component={AdminUserListScreen}
                        />
                        <Route
                           path="/admin-user-edit/:id"
                           component={AdminUserEditScreen}
                        />
                        <Route
                           path="/admin-order-list"
                           component={AdminOrderListScreen}
                        />
                        <Route
                           path="/admin-order-details/:id"
                           component={AdminOrderDetailsScreen}
                        />
                     </Switch>
                  </div>
               </main>

               <Footer />
            </Router>
         </Provider>
      );
   }
}

export default App;
