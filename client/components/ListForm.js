import React from 'react';

class ListForm extends React.Component {

  save = (e) => {
    e.preventDefault();
    this.props.addList(this.refs.input.value);
    this.refs.input.focus();
    this.refs.form.reset();
  }

  toggleExpand = (e) => {
    setTimeout( () =>{
      if($(this.refs.button).attr(':visible')) {
        $(this.refs.button).hide();
      } else {
        $(this.refs.button).show();
      }
      this.refs.form.reset();
    }, 200);
  }

  render() {
    return(
      <form
        ref="form"
        onSubmit={this.save}
        className="list-wrapper grey lighten-2"
      >
        <input
          ref="input"
          onFocus={this.toggleExpand}
          onBlur={this.toggleExpand}
          placeholder="Add a list..."
          required
        />
        <button
          ref="button"
          type="submit"
          className="waves-effect waves-light btn blue-grey hidden"
        >
          Save
        </button>
      </form>
    );
  }
}

export default ListForm;
