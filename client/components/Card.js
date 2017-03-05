import React from 'react'

class Card extends React.Component {

  handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      this.props.updateCard({
        id: this.props.card.id,
        title: this.refs.input.value
      });
      this.refs.input.blur();
    }
  }

  render() {
    return(
      <div className="card-wrapper">
        <div className="card">
          <div className="card-content">
            <div className="input-field">
              <textarea
                ref="input"
                onKeyPress={this.handleKeyPress}
                className="materialize-textarea"
                defaultValue={this.props.card.body}
              >
              </textarea>
            </div>
            <a
              onClick={ () => {this.props.destroyCard(this.props.card.id)} }
              href="#"
            >
              <i className="material-icons">clear</i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
