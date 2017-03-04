import React from 'react';

class ListForm extends React.Component {

  save = (e) => {
    e.preventDefault();
    this.props.addList(this.refs.input.value);
    this.refs.form.reset();
    this.refs.input.focus();
  }

  render() {
    return(
      <form
        ref="form"
        onSubmit={this.save}
        className="list-wrapper blue-grey white-text"
      >
        <input ref="input" id="add-list" placeholder="Add a list..."/>
        <button type="submit" className="btn green">Save</button>
      </form>
    );
  }
}

export default ListForm;
