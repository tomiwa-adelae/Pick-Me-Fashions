import React, { Component } from 'react';

export default class Loader extends Component {
   render() {
      return (
         <div className="loader">
            <i className="fas fa-spinner fa-spin"></i>
         </div>
      );
   }
}
