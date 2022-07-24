import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import Product from '../components/Product';
import Message from '../components/Message';
import ErrorMessage from '../components/ErrorMessage';

class ProductListScreen extends Component {
   render() {
      const { error, productLoading, products } = this.props;
      return (
         <div className="product-list">
            <h1>Latest Products</h1>
            {productLoading ? (
               <Loader />
            ) : error.message !== null ? (
               <ErrorMessage message={error.message} />
            ) : products.length === 0 ? (
               <Message message="There is no product!" />
            ) : (
               <div className="products">
                  {products.map((product) => (
                     <Product key={product._id} product={product} />
                  ))}
               </div>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   products: state.products.products,
   productLoading: state.products.productLoading,
   error: state.error,
});

export default connect(mapStateToProps, {})(ProductListScreen);
