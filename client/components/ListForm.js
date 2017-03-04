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
        className="list-wrapper grey lighten-2"
      >
        <input ref="input" placeholder="Add a list..."/>
        <button type="submit" className="btn green">Save</button>
      </form>
    );
  }
}

export default ListForm;
