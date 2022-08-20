import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveShipping } from '../actions/shippingActions';
import CheckoutSteps from '../components/CheckOutSteps';
import ErrorMessage from '../components/ErrorMessage';

class ShippingScreen extends Component {
   state = {
      address: '',
      city: '',
      country: '',
      phoneNumber: '',
      errorMessage: null,
   };

   componentDidMount() {
      const { user, shippingAddress } = this.props;

      if (!user) {
         return this.props.history.push('/login');
      }

      if (shippingAddress) {
         const { address, city, country, phoneNumber } = shippingAddress;

         this.setState({ address, city, country, phoneNumber });
      } else {
         return;
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

      const { address, city, country, phoneNumber } = this.state;

      if (!address) {
         this.setState({ errorMessage: 'Please enter your address!' });
      } else if (!phoneNumber) {
         this.setState({ errorMessage: 'Please enter your phone number' });
      } else if (phoneNumber.length !== 11 || phoneNumber.charAt(0) !== '0') {
         this.setState({ errorMessage: 'Please enter a valid phone number' });
      } else if (!city) {
         this.setState({ errorMessage: 'Please enter your city!' });
      } else if (!country) {
         this.setState({ errorMessage: 'Please enter your country!' });
      } else {
         const addressData = {
            address,
            city,
            country,
            phoneNumber,
         };

         this.props.saveShipping(addressData);
         this.props.history.push('/payment');
      }
   };
   render() {
      const { address, city, country, phoneNumber, errorMessage } = this.state;
      return (
         <div className="container">
            <div className="shipping">
               <CheckoutSteps step1 step2 />
               <h1>Shipping</h1>
               {errorMessage !== null && (
                  <ErrorMessage message={errorMessage} />
               )}
               <form onSubmit={this.onSubmit}>
                  <div>
                     <label htmlFor="address">Address</label>
                     <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        placeholder="Enter Address"
                        onChange={this.onChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="phoneNumber">Phone Number</label>
                     <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        placeholder="Enter Phone number"
                        onChange={this.onChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="city">City</label>
                     <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        placeholder="Enter City"
                        onChange={this.onChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="country">Country</label>
                     <input
                        type="text"
                        id="country"
                        name="country"
                        value={country}
                        placeholder="Enter Country"
                        onChange={this.onChange}
                     />
                  </div>

                  <div>
                     <button className="btn btn-primary">Continue</button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   shippingAddress: state.shipping.shippingAddress,
});

export default connect(mapStateToProps, { saveShipping })(ShippingScreen);
