import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';

const style = {
  display: 'flex',
};

export default DragDropContext(HTML5Backend)(class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: [{
        id: 1,
        text: 'Write a cool JS library'
      }, {
        id: 2,
        text: 'Make it generic enough'
      }, {
        id: 3,
        text: 'Write README'
      }, {
        id: 4,
        text: 'Create some examples'
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
      }, {
        id: 6,
        text: '???'
      }, {
        id: 7,
        text: 'PROFIT'
      }]
    };
  }

  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      },
    }));
  }

  findCard(id) {
    const { cards } = this.state;
    // TODO: This could return undefined
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card),
    };
  }

  render() {
    const { cards } = this.state;

    return React.createElement(
      'div',
      { style: style },
      cards.map((card, i) => React.createElement(Card, {
        key: card.id,
        index: i,
        id: card.id,
        text: card.text,
        moveCard: this.moveCard.bind(this),
        findCard: this.findCard.bind(this),
      }))
    );
  }
});
