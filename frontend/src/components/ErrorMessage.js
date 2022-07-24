import React, { Component } from 'react';

export default class ErrorMessage extends Component {
   render() {
      return <div className="msg error-msg">{this.props.message}</div>;
   }
}
