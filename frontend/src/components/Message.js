import React, { Component } from 'react';

export default class Message extends Component {
   render() {
      return <div className="msg success-msg">{this.props.message}</div>;
   }
}
