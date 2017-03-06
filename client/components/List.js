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

    $(this.refs.dropdownButton).dropdown({
         inDuration: 300,
         outDuration: 225,
         constrainWidth: false,
         hover:true,
         gutter: 0,
         belowOrigin: false,
         alignment: 'right',
         stopPropagation: false
       }
     );
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
      <div
        className="list-wrapper blue-grey lighten-4"
      >
        <div className="row">
          <a
            ref="dropdownButton"
            className='dropdown-button right'
            href='#'
            data-activates={`list-dropdown-${this.props.list.id}`}
          >
            <i className="material-icons">more_horiz</i>
          </a>
          <ul id={`list-dropdown-${this.props.list.id}`} className='dropdown-content'>
            <li>
              <a
                onClick={ () => {this.props.destroyList(this.props.list.id)} }
                href="#"
                ref="button"
              >
                Complete List
              </a>
            </li>
          </ul>
          <input
            ref="input"
            className="input-with-icon"
            defaultValue={this.props.list.title}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        { this.displayCards() }
        <CardForm addCard={this.addCard} />
        <button
          onClick={ () => {this.props.destroyList(this.props.list.id)} }
          href="#"
          ref="button"
          className="hidden btn red right"
        > Archive List
        </button>
      </div>
    );
  }
}

export default List
