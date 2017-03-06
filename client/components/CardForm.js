import React from 'react'

class CardForm extends React.Component {
  state = { expand: false }

  save = (e) => {
    e.preventDefault();
    this.props.addCard(this.refs.input.value);
    this.refs.form.reset();
    this.refs.input.focus();
  }

  onBlur = () => {
    this.refs.form.reset();
  }

  // TODO: fix save button event order
  toggleExpand = () => {
    setTimeout( () =>{$(this.refs.button).toggle()}, 100);
  }

  render() {
    return(
      <div className="card-wrapper">
        <div className="card">
          <div className="card-content">
            <form ref="form" onSubmit={this.save} onBlur={this.onBlur}>
              <input
                ref="input"
                onFocus={this.toggleExpand}
                onBlur={this.toggleExpand}
                placeholder="Add a card..."
              />
              <button
                ref="button"
                type="submit"
                className="waves-effect wave-light btn blue-grey hidden"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CardForm
