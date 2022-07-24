import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

function SampleNextArrow(props) {
   const { onClick } = props;
   return (
      <div className="icons-right icons" onClick={onClick}>
         <i className="fas fa-angle-right"></i>
      </div>
   );
}

function SamplePrevArrow(props) {
   const { onClick } = props;
   return (
      <div className="icons-left icons" onClick={onClick}>
         <i className="fas fa-angle-left"></i>
      </div>
   );
}

class ProductCarousel extends Component {
   render() {
      const settings = {
         infinite: true,
         speed: 1000,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         nextArrow: <SampleNextArrow />,
         prevArrow: <SamplePrevArrow />,
      };
      const { mostRated, productLoading, error } = this.props;
      return (
         <div className="product-carousel">
            {productLoading ? (
               <Loader />
            ) : error.message !== null ? (
               <ErrorMessage message={error.message} />
            ) : (
               <Slider {...settings}>
                  {mostRated.map((product) => (
                     <Link key={product._id} to={`product/${product._id}`}>
                        <div className="product">
                           <h2>
                              {' '}
                              {product.name} (#{product.price}){' '}
                           </h2>
                           <img src={product.image} alt={product.name} />
                        </div>
                     </Link>
                  ))}
               </Slider>
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   productLoading: state.products.productLoading,
   mostRated: state.products.mostRated,
   error: state.error,
});

export default connect(mapStateToProps, {})(ProductCarousel);
