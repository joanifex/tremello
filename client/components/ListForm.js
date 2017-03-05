import React from 'react';

class ListForm extends React.Component {

  save = (e) => {
    e.preventDefault();
    this.props.addList(this.refs.input.value);
    this.refs.form.reset();
    this.refs.input.focus();
  }

  onBlur = () => {
    this.refs.form.reset();
  }

  toggleExpand = (e) => {
    setTimeout( () =>{$(this.refs.button).toggle()}, 100);
  }

  render() {
    return(
      <form
        ref="form"
        onSubmitCapture={this.save}
        className="list-wrapper grey lighten-2"
        onBlur={this.onBlur}
      >
        <input
          ref="input"
          onFocus={this.toggleExpand}
          onBlur={this.toggleExpand}
          placeholder="Add a list..."
        />
        <button
          ref="button"
          type="submit"
          className="btn green hidden"
        >
          Save
        </button>
      </form>
    );
  }
}

export default ListForm;
