import React from 'react'

class Card extends React.Component {

  componentDidMount = () => {
    $(this.refs.dropdownButton).dropdown({
         inDuration: 300,
         outDuration: 225,
         constrainWidth: false,
         hover: true,
         gutter: 0,
         belowOrigin: false,
         alignment: 'right',
         stopPropagation: false
       }
     );
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      this.props.updateCard({
        id: this.props.card.id,
        title: this.refs.input.value
      });
      this.refs.input.blur();
    }
  }

  toggleButton = () => {
    $(this.refs.button).toggle();
  }

  render() {
    return(
      <div
        className="card-wrapper"
        onMouseEnter={this.toggleButton}
        onMouseLeave={this.toggleButton}
      >
        <div className="card">
          <div className="card-content">
            <a
              ref="dropdownButton"
              className='dropdown-button right'
              href='#'
              data-activates={`card-dropdown-${this.props.card.id}`}
            >
              <i className="material-icons">more_horiz</i>
            </a>
            <ul id={`card-dropdown-${this.props.card.id}`} className='dropdown-content'>
              <li>
                <a
                  onClick={ () => {this.props.destroyCard(this.props.card.id)} }
                  href="#"
                >
                  <span ClassName="blue-grey-text-lighten-4">Complete Card</span>
                </a>
              </li>
            </ul>
            <div className="input-field">
              <textarea
                ref="input"
                onKeyPress={this.handleKeyPress}
                className="materialize-textarea"
                defaultValue={this.props.card.body}
              >
              </textarea>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
