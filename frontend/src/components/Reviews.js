import React, { Component } from 'react';
import Rating from './Rating';

class Reviews extends Component {
   render() {
      const { review } = this.props;
      return (
         <div className="review">
            <strong>{review.name}</strong>
            <Rating rating={review.rating} />
            <strong>{review.createdAt.substring(0, 10)}</strong>
            <p>{review.comment}</p>
         </div>
      );
   }
}

export default Reviews;
