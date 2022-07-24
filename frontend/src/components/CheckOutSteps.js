import React, { Component } from 'react';

class CheckoutSteps extends Component {
   render() {
      const { step1, step2, step3, step4 } = this.props;
      return (
         <div className="check-out">
            <div className={step1 ? 'active' : ''}>Sign In</div>
            <div className={step2 ? 'active' : ''}>Shipping</div>
            <div className={step3 ? 'active' : ''}>Payment</div>
            <div className={step4 ? 'active' : ''}>Place Order</div>
         </div>
      );
   }
}

export default CheckoutSteps;
