import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import { getProducts, deleteProduct } from '../actions/productActions';
import { clearErrors } from '../actions/errorActions';
import ErrorMessage from '../components/ErrorMessage';

class AdminProductList extends Component {
   componentDidMount() {
      const { user } = this.props;

      if (!user || !user.isAdmin) {
         return this.props.history.push('/login');
      }

      this.props.getProducts();

      this.props.clearErrors();
   }

   componentDidUpdate(prevProps) {
      const { isAuthenticated, error } = this.props;

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }

      if (error !== prevProps.error) {
         // Check for PRODUCT LIST FAIL Error
         if (error.message !== null) {
            this.props.getProducts();
         }
      }
   }

   createProduct = () => {
      this.props.history.push('/admin-product-create');
   };

   // Delete Product
   deleteProduct = (id) => {
      this.props.deleteProduct(id);

      this.props.getProducts();
   };

   render() {
      const { products, productLoading, error } = this.props;

      return (
         <div className="admin-product-list">
            <div className="header">
               <h1>Product</h1>
               <div onClick={this.createProduct} className="btn btn-black">
                  <i className="fas fa-plus"></i> Create Product
               </div>
            </div>
            {productLoading ? (
               <Loader />
            ) : error.message !== null ? (
               <ErrorMessage message={error.message} />
            ) : products.length === 0 ? (
               <div className="alert">Your Product list is empty.</div>
            ) : (
               <div className="product">
                  <table cellSpacing="0">
                     <thead>
                        <tr>
                           <th>Id</th>
                           <th>Name</th>
                           <th>Price</th>
                           <th>Category</th>
                           <th>Brand</th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {products.map((product) => (
                           <tr key={product._id}>
                              <td>{product._id}</td>
                              <td>{product.name}</td>
                              <td>#{product.price}</td>
                              <td>{product.category}</td>
                              <td>{product.brand}</td>
                              <td
                                 onClick={this.deleteProduct.bind(
                                    this,
                                    product._id
                                 )}
                              >
                                 <i className="fas fa-trash"></i>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  <div className="mobile">
                     {products.map((product) => (
                        <div key={product._id} className="mobile-product">
                           <div className="img">
                              <img src={product.image} alt={product.name} />
                           </div>
                           <div className="content">
                              <h3>{product.name}</h3>
                              <p>Order {product._id}</p>
                              <p> #{product.price} </p>
                              <p> Category - {product.category} </p>
                              <p> Brand - {product.brand} </p>
                           </div>
                           <div
                              className="icon"
                              onClick={this.deleteProduct.bind(
                                 this,
                                 product._id
                              )}
                           >
                              <i className="fas fa-trash"></i>
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
   isAuthenticated: state.user.isAuthenticated,
   products: state.products.products,
   productLoading: state.products.productLoading,
   error: state.error,
});

export default connect(mapStateToProps, {
   getProducts,
   deleteProduct,
   clearErrors,
})(AdminProductList);
