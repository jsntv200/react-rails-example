class RecordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date:   props.date,
      title:  props.title,
      amount: props.amount,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [`${event.target.name}`]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let record = this.state;

    $.post('', { record }, onSuccess.bind(this), 'JSON');

    function onSuccess(data) {
      this.props.handleNewRecord(data);
      this.setState(this.props);
    }
  }

  valid() {
    return this.state.title
        && this.state.date
        && this.state.amount;
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Amount"
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange} />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.valid()}>
          Create Record
        </button>
      </form>
    );
  }
}

RecordForm.propTypes = {
  date:   React.PropTypes.string,
  title:  React.PropTypes.string,
  amount: React.PropTypes.string,
};

RecordForm.defaultProps = {
  date:   '',
  title:  '',
  amount: '',
};

