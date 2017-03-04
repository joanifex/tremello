import React from 'react'

class Card extends React.Component {

  render() {
    return(
      <div className="card-wrapper">
        <div className="card">
          <div className="card-content">
            {this.props.card.body}
          </div>
        </div>
      </div>
    )
  }
}

export default Card
