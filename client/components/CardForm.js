import React from 'react'

class CardForm extends React.Component {

  save = (e) => {
    e.preventDefault();
    this.props.addCard(this.refs.input.value);
    this.refs.form.reset();
    this.refs.input.focus();
  }

  render() {
    return(
      <div className="card-wrapper">
        <div className="card">
          <div className="card-content">
            <form ref="form" onSubmit={this.save}>
              <input ref="input" placeholder="Add a card..." />
              <button type="submit" className="btn green">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CardForm
