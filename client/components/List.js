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

  handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      this.props.updateList({
        id: this.props.list.id,
        title: this.refs.input.value
      });
      this.refs.input.blur();
    }
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
      </div>
    );
  }
}

export default List
