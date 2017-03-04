import React from 'react';
import List from './List'

class Board extends React.Component {
  state = { lists: [] }

  componentDidMount = () => {
    $.ajax({
      url: '/api/lists',
      type: 'GET',
      dataType: 'JSON'
    }).done( lists => {
      this.setState({ lists });
    }).fail( data => {
      console.log(data);
    });
  }

  displayLists = () => {
    return this.state.lists.map( list => {
        return (
          <List key={list.id} list={list}/>
        )
      });
  }

  render() {
    return(
      <div className="board">
        { this.displayLists() }
      </div>
    );
  }
}

export default Board
