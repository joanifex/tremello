import React from 'react';

class Cards extends React.Component {
  state = { list: {}, cards: [] };

  componentDidMount() {
    $.ajax({
      url: `/api/lists/${this.props.params.id}`,
      type: 'GET',
      dataType: 'JSON'
    }).doce( menu => {
      this.setState({...list });
    }).fail( data => {
      console.log(data);
    })
  }
}
