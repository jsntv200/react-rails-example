import React from 'react';
import amountFormat from '../Utils/amount-format';

class AmountBox extends React.Component {
  static propTypes = {
    type:   React.PropTypes.string,
    text:   React.PropTypes.string,
    amount: React.PropTypes.number,
  };

  render() {
    return (
      <div className="col-md-4">
        <div className={ `panel panel-${this.props.type}` }>
          <div className="panel-heading">
            { this.props.text }
          </div>
          <div className="panel-body">
            { amountFormat(this.props.amount) }
          </div>
        </div>
      </div>
    );
  }
}

export default AmountBox;
