import React from 'react'

class CardForm extends React.Component {
  state = { expand: false }

  save = (e) => {
    e.preventDefault();
    this.props.addCard(this.refs.input.value);
    this.refs.form.reset();
    this.refs.input.focus();
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
      <div className="card-wrapper">
        <div className="card">
          <div className="card-content">
            <form ref="form" onSubmit={this.save}>
              <input
                ref="input"
                onFocus={this.toggleExpand}
                onBlur={this.toggleExpand}
                placeholder="Add a card..."
                required
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
