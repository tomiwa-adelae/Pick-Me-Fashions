import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListScreen from './ProductListScreen';
import { getProducts, mostRatedProducts } from '../actions/productActions';
import { clearErrors } from '../actions/errorActions';
import ProductCarousel from '../components/ProductCarousel';

class HomeScreen extends Component {
   componentDidMount() {
      this.props.getProducts();
      this.props.mostRatedProducts();
      this.props.clearErrors();
   }
   render() {
      return (
         <div className="home-screen">
            {/* Product Carousel */}
            <ProductCarousel />
            {/* Product list */}
            <ProductListScreen />
         </div>
      );
   }
}

export default connect(null, { getProducts, mostRatedProducts, clearErrors })(
   HomeScreen
);
