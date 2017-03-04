import React from 'react'

class Card extends React.Component {

  render() {
    return(
      <div>
        {this.props.card.body}
      </div>
    )
  }
}

export default Card
