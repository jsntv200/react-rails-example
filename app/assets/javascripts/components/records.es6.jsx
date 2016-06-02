class Records extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data
    };

    this.addRecord    = this.addRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  addRecord(record) {
    let data = this.state.data.slice();
    data.push(record);

    this.setState({ data });
  }

  updateRecord(record) {
    let data  = this.state.data.slice();
    let item  = data.find(item => item.id === record.id);
    let index = data.indexOf(item);
    data[index] = record;

    this.setState({ data });
  }

  deleteRecord(record) {
    let data  = this.state.data.slice();
    let index = data.indexOf(record);
    data.splice(index, 1);

    this.setState({ data });
  }

  render() {
    let self = this;

    function totalAmounts(prev, curr) {
      return prev + parseFloat(curr.amount);
    }

    function credits() {
      let items = self.state.data.filter(val => val.amount >= 0);
      return items.reduce(totalAmounts, 0);
    }

    function debits() {
      let items = self.state.data.filter(val => val.amount < 0);
      return items.reduce(totalAmounts, 0);
    }

    function balance() {
      return debits() + credits();
    }

    function createElementRecord(record) {
      return React.createElement(Record, {
        key: record.id,
        handleEditRecord:   this.updateRecord,
        handleDeleteRecord: this.deleteRecord,
        ...record
      });
    }

    return (
      <div className="records">
        <h2 className="title">Records</h2>
        <div className="row">
          { React.createElement(AmountBox, { type: 'success', text: 'Credit',  amount: credits() }) }
          { React.createElement(AmountBox, { type: 'danger',  text: 'Debit',   amount: debits()  }) }
          { React.createElement(AmountBox, { type: 'info',    text: 'Balance', amount: balance() }) }
        </div>
        { React.createElement(RecordForm, { handleNewRecord: this.addRecord }) }
        <hr/>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.state.data.map(createElementRecord.bind(this)) }
          </tbody>
        </table>
      </div>
    );
  }
}

Records.propTypes = {
  data: React.PropTypes.array,
};
