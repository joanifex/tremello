import React from 'react'
import Card from './Card'

class List extends React.Component {
  state = { cards: [] }

  componentDidMount = () => {
    $.ajax({
      url: `/api/lists/${this.props.list.id}/cards`,
      type: 'GET',
      dataType: 'JSON'
    }).done( cards => {
      this.setState({ cards });
    }).fail( data => {
      console.log(data);
    });
  }

  displayCards = () => {
    return this.state.cards.map( card => {
      return(
        <Card key={card.id} card={card} />
      );
    });
  }

  render() {
    return (
      <div className="list-wrapper grey lighten-2">
        <span>{this.props.list.title}</span>
        { this.displayCards() }
      </div>
    );
  }
}

export default List
