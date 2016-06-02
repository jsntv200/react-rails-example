class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    }

    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit   = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({ edit: !this.state.edit });
  }

  handleEdit(event) {
    event.preventDefault();

    let data = {
      title:  ReactDOM.findDOMNode(this.refs.title).value,
      date:   ReactDOM.findDOMNode(this.refs.date).value,
      amount: ReactDOM.findDOMNode(this.refs.amount).value,
    };

    $.ajax({
      method:   'PUT',
      dataType: 'JSON',
      url:      `/records/${ this.props.id }`,
      data:     { record: data },
      success:  record => {
        this.setState({ edit: false });
        this.props.handleEditRecord(record);
      }
    });
  }

  handleDelete(event) {
    event.preventDefault();

    $.ajax({
      method:   'DELETE',
      dataType: 'JSON',
      url:      `/records/${ this.props.id }`,
      success:  () => {
        this.props.handleDeleteRecord(this.props);
      }
    });
  }

  render() {
    let self = this;

    function recordRow() {
      return (
        <tr>
          <td>{self.props.date}</td>
          <td>{self.props.title}</td>
          <td>{amountFormat(self.props.amount)}</td>
          <td>
            <a className="btn btn-default" onClick={self.handleToggle}>
              Edit
            </a>
            <a className="btn btn-danger" onClick={self.handleDelete}>
              Delete
            </a>
          </td>
        </tr>
      );
    }

    function recordForm() {
      return (
        <tr>
          <td>
            <input
              className="form-control"
              type="text"
              ref="date"
              defaultValue={self.props.date} />
          </td>
          <td>
            <input
              className="form-control"
              type="text"
              ref="title"
              defaultValue={self.props.title} />
          </td>
          <td>
            <input
              className="form-control"
              type="text"
              ref="amount"
              defaultValue={self.props.amount} />
          </td>
          <td>
            <a className="btn btn-default" onClick={self.handleEdit}>
              Update
            </a>
            <a className="btn btn-danger" onClick={self.handleDelete}>
              Delete
            </a>
          </td>
        </tr>
      );
    }

    if (this.state.edit) {
      return recordForm();
    } else {
      return recordRow();
    }
  }
}

Record.propTypes = {
  id:     React.PropTypes.number,
  date:   React.PropTypes.string,
  title:  React.PropTypes.string,
  amount: React.PropTypes.number,
};
