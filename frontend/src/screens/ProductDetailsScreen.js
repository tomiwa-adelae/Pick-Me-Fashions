import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { getProduct, createProductReviews } from '../actions/productActions';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Message from '../components/Message';
import Reviews from '../components/Reviews';

class ProductDetailsScreen extends Component {
   state = {
      qty: '1',
      rating: 0,
      comment: '',
   };
   componentDidMount() {
      const id = this.props.match.params.id;

      this.props.getProduct(id);
   }

   componentDidUpdate() {
      const { reviewSuccess } = this.props;

      if (reviewSuccess) {
         window.location.reload();
      }
   }

   setQty = (e) => {
      this.setState({ qty: e.target.value });
   };

   addToCart = () => {
      const id = this.props.match.params.id;
      this.props.history.push(`/cart/${id}?qty=${this.state.qty}`);
   };

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   onSubmit = (e) => {
      const id = this.props.match.params.id;

      const { user } = this.props;

      e.preventDefault();

      const review = {
         userId: user.id,
         name: user.name,
         rating: this.state.rating,
         comment: this.state.comment,
      };

      this.props.createProductReviews(id, review);
   };
   render() {
      const {
         productLoading,
         product,
         error,
         reviews,
         user,
         reviewSuccess,
         reviewFail,
      } = this.props;

      return (
         <div className="product-details">
            <div className="back">
               <Link to="/">
                  <button className="btn btn-light">Back</button>
               </Link>
            </div>
            {productLoading ? (
               <Loader />
            ) : error.message !== null ? (
               <ErrorMessage message={error.message} />
            ) : (
               <>
                  <div className="details">
                     <div className="img">
                        <img src={product.image} alt={product.name} />
                     </div>
                     <div className="title">
                        <h2>{product.name}</h2>
                        <div className="line"></div>
                        <p>Price: # {product.price}</p>
                        <div className="line"></div>
                        <Rating
                           rating={product.rating}
                           numReviews={`${product.numReviews} reviews`}
                        />
                        <div className="line"></div>
                        <p>Description: {product.description}</p>
                     </div>
                     <div className="box">
                        <div>
                           <p>Price: </p>
                           <span># {product.price}</span>
                        </div>
                        <div>
                           <p>Status: </p>
                           <span>
                              {product.countInStock >= 1 ? (
                                 <span className="success-color">In Stock</span>
                              ) : (
                                 <span className="danger-color">
                                    Out of Stock
                                 </span>
                              )}
                           </span>
                        </div>
                        {product.countInStock >= 1 ? (
                           <div className="select-box">
                              <p>Qty: </p>
                              <div className="select">
                                 <select
                                    value={this.state.qty}
                                    onChange={this.setQty}
                                 >
                                    {[
                                       ...Array(product.countInStock).keys(),
                                    ].map((x) => (
                                       <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                       </option>
                                    ))}
                                 </select>
                                 <i className="fas fa-caret-down"></i>
                              </div>
                           </div>
                        ) : null}
                        <div onClick={this.addToCart} className="button">
                           <button
                              disabled={product.countInStock <= 0}
                              className="btn btn-primary"
                           >
                              Add To Cart
                           </button>
                        </div>
                     </div>
                  </div>
                  <div className="line"></div>
                  <div className="review-section">
                     <h3>Reviews</h3>
                     {reviews.length === 0 && (
                        <Message message={'No Reviews'} />
                     )}
                     <div className="reviews">
                        {reviews.map((review) => (
                           <Reviews key={review._id} review={review} />
                        ))}
                     </div>
                     <div className="line"></div>
                     <div className="comment">
                        <h3>Write a customer review</h3>
                        {productLoading && <Loader />}
                        {reviewSuccess && (
                           <Message message="Review added successfully" />
                        )}
                        {reviewFail && <ErrorMessage message={reviewFail} />}
                        {user ? (
                           <form onSubmit={this.onSubmit}>
                              <div>
                                 <label htmlFor="rating">Rating</label>
                                 <div className="select">
                                    <select
                                       value={this.state.rating}
                                       name="rating"
                                       onChange={this.onChange}
                                    >
                                       <option value="">Select...</option>
                                       <option value="1">1 - Poor</option>
                                       <option value="2">2 - Fair</option>
                                       <option value="3">3 - Good</option>
                                       <option value="4">4 - Very Good</option>
                                       <option value="5">5 - Excellent</option>
                                    </select>
                                    <i className="fas fa-caret-down"></i>
                                 </div>
                              </div>
                              <div>
                                 <label htmlFor="comment">Comment</label>
                                 <textarea
                                    id="comment"
                                    name="comment"
                                    cols="30"
                                    rows="5"
                                    placeholder="Enter Comment"
                                    value={this.state.comment}
                                    onChange={this.onChange}
                                 ></textarea>
                              </div>
                              <div>
                                 <button className="btn btn-primary">
                                    Submit Review
                                 </button>
                              </div>
                           </form>
                        ) : (
                           <div className="alert">
                              Please <Link to="/login">sign in </Link> to write
                              a review
                           </div>
                        )}
                     </div>
                  </div>
               </>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   product: state.products.product,
   productLoading: state.products.productLoading,
   error: state.error,
   reviews: state.products.reviews,
   user: state.user.user,
   reviewSuccess: state.products.reviewSuccess,
   reviewFail: state.products.reviewFail,
});

export default connect(mapStateToProps, { getProduct, createProductReviews })(
   ProductDetailsScreen
);
