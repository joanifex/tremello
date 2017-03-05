import React from 'react'
import Card from './Card'
import CardForm from './CardForm'

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

  handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      this.props.updateList({
        id: this.props.list.id,
        title: this.refs.input.value
      });
      this.refs.input.blur();
    }
  }

  addCard = (body) => {
    $.ajax({
      url: `/api/lists/${this.props.list.id}/cards`,
      type: 'POST',
      dataType: 'JSON',
      data: { card: {body} }
    }).done( card => {
      this.setState({ cards: [...this.state.cards, card]});
    }).fail( data => {
      console.log(data);
    });
  }

  updateCard = (card) => {
    $.ajax({}).done( updatedCard => {
      let cards = this.state.cards.map( card => {
        return card.id === updatedCard.id ? updatedCard : card;
      });
      this.setState({ cards });
    }).fail( data => {
      console.log(data);
    });
  }

  destroyCard = (id) => {
    $.ajax({
      url: `/api/lists/${this.props.list.id}/cards/${id}`,
      type: 'DELETE',
    }).done( data => {
      this.setState({ cards: this.state.cards.filter( card => {
        return card.id !== id;
        })
      });
    }).fail( data => {
      console.log(data);
    });
  }

  displayCards = () => {
    return this.state.cards.map( card => {
      return(
        <Card
          key={card.id}
          card={card}
          updateCard={this.updateCard}
          destroyCard={this.destroyCard}
        />
      );
    });
  }

  render() {
    return (
      <div className="list-wrapper grey lighten-2">
        <div className="row">
          <input
            ref="input"
            onKeyPress={this.handleKeyPress}
            defaultValue={this.props.list.title}
          />
          <a
            onClick={ () => {this.props.destroyList(this.props.list.id)} }
            href="#"
          >
            <i className="material-icons right">clear</i>
          </a>
        </div>
        { this.displayCards() }
        <CardForm addCard={this.addCard} />
      </div>
    );
  }
}

export default List
