import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundScreen extends Component {
   render() {
      return (
         <div className="notfoundscreen container">
            <h1>404 Not Found</h1>
            <Link className="btn btn-primary" to="/">
               Go back
            </Link>
         </div>
      );
   }
}

export default NotFoundScreen;
