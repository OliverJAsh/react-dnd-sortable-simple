import React, { Component } from 'react';
import Container from './Container';

export default class SortableSimple extends Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        null,
        React.createElement(
          'b',
          null,
          React.createElement(
            'a',
            { href: 'https://github.com/react-dnd/react-dnd/tree/master/examples/04%20Sortable/Simple' },
            'Browse the Source'
          )
        )
      ),
      React.createElement(
        'p',
        null,
        'It is easy to implement a sortable interface with React DnD. Just make the same component both a drag source and a drop target, and reorder the data in the ',
        React.createElement(
          'code',
          null,
          'hover'
        ),
        ' handler.'
      ),
      React.createElement(Container, null)
    );
  }
}
