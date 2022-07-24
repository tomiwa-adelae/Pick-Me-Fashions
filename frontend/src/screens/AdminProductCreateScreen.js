import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { connect } from 'react-redux';
import { createProduct } from '../actions/productActions';

class AdminProductCreateScreen extends Component {
   state = {
      name: '',
      image: '',
      price: '',
      description: '',
      brand: '',
      category: '',
      countInStock: '',
      imageErr: false,
      imageLoading: false,
   };

   componentDidMount() {
      const { user } = this.props;

      if (!user || !user.isAdmin) {
         return this.props.history.push('/login');
      }
   }

   componentDidUpdate() {
      const { createSuccess, isAuthenticated } = this.props;
      if (createSuccess) {
         return this.props.history.push('/admin-product-list');
      }

      if (!isAuthenticated) {
         return this.props.history.push('/login');
      }
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   handleFileInputChange = (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         this.uploadImage(reader.result);
      };
   };

   uploadImage = (base64EncodedImage) => {
      this.setState({
         imageLoading: true,
      });

      axios
         .post('/api/uploads', { data: base64EncodedImage })
         .then((res) => {
            this.setState({
               image: res.data,
               imageErr: false,
               imageLoading: false,
            });
         })
         .catch((err) => {
            this.setState({ image: '', imageErr: true, imageLoading: false });
         });
   };

   onSubmit = (e) => {
      e.preventDefault();
      const { name, image, price, brand, category, countInStock, description } =
         this.state;

      const newProduct = {
         name,
         image,
         price,
         brand,
         category,
         countInStock,
         description,
      };

      this.props.createProduct(newProduct);
   };

   render() {
      const {
         name,
         price,
         description,
         category,
         brand,
         countInStock,
         imageErr,
         imageLoading,
      } = this.state;

      const { productLoading, error } = this.props;
      return (
         <div className="admin-product-create">
            <h1>Create Product</h1>
            {productLoading && <Loader />}
            {error.message !== null ? (
               <ErrorMessage message={error.message} />
            ) : (
               ''
            )}
            <form onSubmit={this.onSubmit}>
               <div>
                  <label htmlFor="name">Name</label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     placeholder="Enter Product Name"
                     value={name}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="price">Price</label>
                  <input
                     type="text"
                     id="price"
                     name="price"
                     placeholder="Enter Product Price"
                     value={price}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="image">Image</label>
                  <input
                     type="file"
                     id="image"
                     className="file"
                     name="image"
                     placeholder="Enter Product Image"
                     onChange={this.handleFileInputChange}
                  />
                  {imageLoading ? (
                     <Loader />
                  ) : (
                     imageErr && (
                        <p className="image-error">
                           <i className="fas fa-exclamation-circle"></i> Only
                           Images!
                        </p>
                     )
                  )}
               </div>
               <div>
                  <label htmlFor="brand">Brand</label>
                  <input
                     type="text"
                     id="brand"
                     placeholder="Enter Product Brand"
                     name="brand"
                     value={brand}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="countInStock">Count In Stock</label>
                  <input
                     type="number"
                     id="countInStock"
                     name="countInStock"
                     placeholder="Enter Product Count In Stock"
                     value={countInStock}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="category">Category</label>
                  <input
                     type="text"
                     id="category"
                     name="category"
                     placeholder="Enter Product Category"
                     value={category}
                     onChange={this.onChange}
                  />
               </div>
               <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                     id="description"
                     name="description"
                     cols="30"
                     rows="5"
                     placeholder="Enter Product Description"
                     value={description}
                     onChange={this.onChange}
                  ></textarea>
               </div>
               <div>
                  <button className="btn btn-primary">Add Product</button>
               </div>
            </form>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   productLoading: state.products.productLoading,
   createSuccess: state.products.createSuccess,
   user: state.user.user,
   isAuthenticated: state.user.isAuthenticated,
   error: state.error,
});

export default connect(mapStateToProps, { createProduct })(
   AdminProductCreateScreen
);
